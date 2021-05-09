import { useEffect } from 'react';
import { useCart, SET_PRODUCTS, SET_CARTLIST, SET_WISHLIST } from './context/cart';
import { Login, SignUp, ProductsList, WishList, CartList, ProductPage } from './views';
import { NavBar } from './components';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { fetchApi, getUserId, isUserLoggedIn, ProtectedRoute } from './helper';
import { toast } from './helper/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

export default function App() {
	const { dispatch } = useCart();
	const userId = getUserId();

	const fetchProducts = async () => {
		try {
			const data = await fetchApi({ url: '/products', method: 'get' });
			const { products: productsList } = data;
			dispatch({
				type: SET_PRODUCTS,
				payload: {
					productsList: productsList
				}
			});
		} catch (error) {
			toast({ type: 'error', message: error.message });
		}
	};

	const fetchCartList = async () => {
		try {
			const userId = getUserId();
			const data = await fetchApi({ url: `/carts/${userId}` });
			let cartList = data.cart.products;

			cartList = cartList.map((cartItem) => ({
				...cartItem.details,
				quantity: cartItem.quantity
			}));

			dispatch({
				type: SET_CARTLIST,
				payload: {
					cartList
				}
			});
		} catch (error) {
			toast({ type: 'error', message: error.message });
		}
	};

	const fetchWishList = async () => {
		try {
			const userId = getUserId();
			const data = await fetchApi({ url: `/wishlists/${userId}` });
			let wishlist = data.wishlist.products;

			dispatch({
				type: SET_WISHLIST,
				payload: {
					wishlist
				}
			});
		} catch (error) {
			toast({ type: 'error', message: error.message });
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		if (isUserLoggedIn()) {
			fetchCartList();
			fetchWishList();
		}
	}, [userId]);

	return (
		<div className="App">
			<ToastContainer />
			<Router>
				<NavBar />
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/signup" component={SignUp} />
					<ProtectedRoute path="/cart" component={CartList} />
					<ProtectedRoute path="/wishlist" component={WishList} />
					<Route path="/products/:productId" component={ProductPage} />
					<Route path="/" component={ProductsList} />
				</Switch>
			</Router>
		</div>
	);
}
