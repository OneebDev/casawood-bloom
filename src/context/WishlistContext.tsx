import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<Product[]>([]);

  // Helper to get Firestore collection for current user's wishlist items
  const getWishlistCollection = () => {
    if (!user) return null;
    return collection(db, "wishlists", user.uid, "items");
  };

  // Load wishlist for logged-in users from Firestore (with live updates)
  useEffect(() => {
    if (!user) {
      setItems([]);
      return;
    }

    const wishlistCol = getWishlistCollection();
    if (!wishlistCol) return;

    // Subscribe to Firestore wishlist for real-time updates
    const unsubscribe = onSnapshot(wishlistCol, (snapshot) => {
      const products: Product[] = snapshot.docs.map((d) => d.data() as Product);
      setItems(products);
    });

    return () => unsubscribe();
  }, [user]);

  const addToWishlist = (product: Product) => {
    if (!user) {
      return;
    }
    setItems((current) => {
      if (current.some((item) => item.id === product.id)) {
        return current;
      }
      return [...current, product];
    });

    // Persist to Firestore (user is guaranteed to be logged in here)
    const wishlistCol = getWishlistCollection();
    if (wishlistCol) {
      const ref = doc(wishlistCol, product.id);
      setDoc(ref, product).catch((error) => {
        console.error("Error adding wishlist item to Firestore:", error);
      });
    }
  };

  const removeFromWishlist = (productId: string) => {
    setItems((current) => current.filter((item) => item.id !== productId));

    const wishlistCol = getWishlistCollection();
    if (wishlistCol) {
      const ref = doc(wishlistCol, productId);
      deleteDoc(ref).catch((error) => {
        console.error("Error removing wishlist item from Firestore:", error);
      });
    } else {
      const next = items.filter((item) => item.id !== productId);
      localStorage.setItem("casawood-wishlist", JSON.stringify(next));
    }
  };

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);

    const wishlistCol = getWishlistCollection();
    if (wishlistCol) {
      getDocs(wishlistCol)
        .then((snapshot) => {
          snapshot.docs.forEach((d) => {
            deleteDoc(d.ref).catch((error) => {
              console.error("Error clearing wishlist item from Firestore:", error);
            });
          });
        })
        .catch((error) => {
          console.error("Error fetching wishlist items for clear:", error);
        });
    }
  };

  const getWishlistCount = () => {
    return items.length;
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        getWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
