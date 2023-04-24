// import React from "react";
// import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import configureStore from "./redux/stores/configureStore";
// import App from "./App";
// import MyComponent from "./components/MyComponent";
// import Exchange from "./components/Exchange";
// import Search from "./components/Search";

// const store = configureStore();

// ReactDOM.render(
// 	<React.StrictMode>
		
// 		<Provider store={store}>
// 	<div class="max-w-[1200px] h-screen grid-rows-2 grid grid-cols-3 gap-5">
// 		<div class ="col-span-2 py-5 h-10">
			
// 			<MyComponent />
// 			</div>
// 			<div class ="col-span-1 py-5">
// 			<Search/></div>
// 			<div class ="col-span-1 row-span-2 py-25">
// 			<div class="p-4 text-sm leading-5 ">
// 			<App/></div></div>
// 			<div class ="col-span-1 py-25">
// 			<Exchange/></div>
// 	</div>
	

			
			
// 		</Provider>
		
		
// 	</React.StrictMode>,
// 	document.getElementById("root")
// );
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
			
			<div className="border border-black pt-20">
			<div className="max-w-[1200px]    grid grid-cols-1 lg:grid-cols-3 gap-5  lg:grid-rows-[auto,1fr,1fr,auto] grid-auto-rows-min-[100px]  ">
 				{/*chart component*/}
				<div className="col-span-2  h-60">
				<div className=" py-5 sm:grid-row-4 min-h-0 border  border-black rounded-lg mx-2 md:ml-0 md:mr-2 w-full md:w-250 px-4 mb-4 flex-grow-1">
					<MyComponent />
				</div>
				{/**holdings form data component */}
				<div className="col-span-1 flex  sm:order-6 md:col-span-1 row-span-2 pt-5 md:py-45 ml-2 mr-2 md:grid-row-4 ">
					<div className="p-4 sm:grid-row-3 text-sm max-w-[400px] leading-5  border border-black rounded-lg">
						<App />
						
					</div>
					<div className="col-span-1 sm:grid-row-2 py-45  h-auto md:h-65 ml-2 mr-2 md:grid-rows-3 border border-black rounded-lg" style={{ width: '65%' }}>
  						<div className="p-6 text-sm leading-5">
   							 <Exchange />
  						</div>
					</div>
				</div>
				{/**exchanges component */}
				
				</div>
				{/**marketcap data component */}
				<div className="col-span-1  " >
				<div className=" py-5  sm:grid-row:1 mx-2 md:ml-0 md:mr-2 md:flex md:flex-col md:order-3 md:grid-row-1 sm:col-span-1 sm:flex sm:flex-col sm:order-1 overflow-y: auto   border border-black rounded-lg"style={{overflowY: "scroll",maxHeight: "800px"}} >
					<Search className="md:h-96 md:grid-row-1" />
				</div></div>
				
				<div className="sm:col-span-3"></div>
			</div>
			</div>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
