import DOMReady from './utils/DOMReady';
import rootView from './views/rootView';
import './style/reset.css';
import 'https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css';

DOMReady(() => {
  // mount the root view
  rootView();
});
