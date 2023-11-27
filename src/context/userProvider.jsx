// UserContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import cartService from '../services/cartService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cartContext, setCart] = useState(null);
  const [accessToken,setAccessToken]=useState(null);
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    window.localStorage.removeItem('accessToken');
  };
  const setCartContext = (cartData) => {
    setCart(cartData)
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accesstoken = window.localStorage.getItem("accessToken");
        if (accesstoken) {
          const payloadBase64 = accesstoken.split(".")[1];
          const payload = atob(payloadBase64);
          login(JSON.parse(payload));
          // console.log(JSON.parse(payload))
          const data = await cartService.getCartByUser(JSON.parse(payload).UserId || null);
          console.log(data.length)
          setCartContext(data);


        }
        else{
          logout();
          // setAccessToken(null);
        }
        // console.log(user)
        // if (user) {
        //   const data = await cartService.getCartByUser(user.UserId || null);
        //   console.log(data.length)
        //   setCartContext(data);

        // }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [accessToken]);


  return (
    <UserContext.Provider value={{ user, login, logout, cartContext, setCartContext,setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
