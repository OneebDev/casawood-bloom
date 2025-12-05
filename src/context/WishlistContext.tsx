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

  // Load wishlist: guests -> localStorage, logged-in -> Firestore (with live updates)
  useEffect(() => {
    // If no logged-in user, fall back to localStorage-only wishlist
    if (!user) {
      const saved = localStorage.getItem("casawood-wishlist");
      setItems(saved ? JSON.parse(saved) : []);
      return;
    }

    const wishlistCol = getWishlistCollection();
    if (!wishlistCol) return;

    // On first login, merge any existing local wishlist into Firestore
    const saved = localStorage.getItem("casawood-wishlist");
    if (saved) {
      const localItems: Product[] = JSON.parse(saved);
      localItems.forEach((product) => {
        const ref = doc(wishlistCol, product.id);
        setDoc(ref, product, { merge: true }).catch((error) => {
          console.error("Error syncing local wishlist to Firestore:", error);
        });
      });
      localStorage.removeItem("casawood-wishlist");
    }

    // Subscribe to Firestore wishlist for real-time updates
    const unsubscribe = onSnapshot(wishlistCol, (snapshot) => {
      const products: Product[] = snapshot.docs.map((d) => d.data() as Product);
      setItems(products);
      // Keep a cached copy in localStorage for faster initial load
      localStorage.setItem("casawood-wishlist", JSON.stringify(products));
    });

    return () => unsubscribe();
  }, [user]);

  const addToWishlist = (product: Product) => {
    setItems((current) => {
      if (current.some((item) => item.id === product.id)) {
        return current;
      }
      return [...current, product];
    });

    // Persist to Firestore if user is logged in
    const wishlistCol = getWishlistCollection();
    if (wishlistCol) {
      const ref = doc(wishlistCol, product.id);
      setDoc(ref, product).catch((error) => {
        console.error("Error adding wishlist item to Firestore:", error);
      });
    } else {
      // Guests: keep using localStorage via effect above
      localStorage.setItem("casawood-wishlist", JSON.stringify([...items, product]));
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

    localStorage.removeItem("casawood-wishlist");
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
