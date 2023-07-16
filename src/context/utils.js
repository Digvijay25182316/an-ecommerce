import Cookies from 'js-cookie';

const getUser = () => {
  return Cookies.get('user');
};

const getToken = () => {
  return Cookies.get('token');
};

const tokenInCookie = data => {
  if (data) {
    Cookies.set('token', data, { expires: 7 });
  } // Expires in 7 days
};

const userInCookie = data => {
  if (data) {
    Cookies.set('user', JSON.stringify(data), { expires: 7 });
  } // Expires in 7 days}
};

const getProducts = () => {
  const products = Cookies.get('CartItems');
  return products;
};

const storeProducts = data => {
  if (data) {
    Cookies.set('CartItems', data, { expires: 15 });
  }
};

const getCartItem = () => {
  // Retrieve the cookie value
  const cookieValue = document.cookie.replace(
    /(?:(?:^|.*;\s*)CartItems\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
  if (cookieValue) {
    try {
      // Parse the cookie value back into an array
      const deserializedArray = JSON.parse(decodeURIComponent(cookieValue));
      return deserializedArray;
    } catch (error) {
      console.log(error);
    }
  } else {
    return 'no cart items to show';
  }
};

const CookieFields = {
  getUser,
  getToken,
  tokenInCookie,
  userInCookie,
  storeProducts,
  getProducts,
  getCartItem,
};

export default CookieFields;
