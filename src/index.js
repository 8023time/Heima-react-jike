import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import router from "./router/index"
import { RouterProvider} from "react-router-dom"
import { Provider } from'react-redux'; // 引入Provider, 用于提供store,保证全局只有一个store
import store from './store/index';
import "normalize.css"
import "react-quill/dist/quill.snow.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* // 使用Provider包裹App组件, 并传入store, 这样App组件就可以使用store了 */}
    <Provider store={store}> 
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
