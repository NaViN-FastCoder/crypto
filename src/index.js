import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/stores/configureStore";
import App from "./App";
import MyComponent from "./components/MyComponent";
import Exchange from "./components/Exchange";
import Search from "./components/Search";

const store = configureStore();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			
			<Search/>
			<MyComponent />
			<App/>
			<Exchange/>
			
		</Provider>
		
		
	</React.StrictMode>,
	document.getElementById("root")
);
