import React from 'react';
import {
	BrowserRouter as Router,
	Link, Switch, Route,
} from 'react-router-dom'

import { CanvasPlayground } from './Page/Canvas/Canvas';
import { Rubik } from './Page/Rubik/Rubik';


export const App = () => {
 	return (<Router>
		 <nav>
			 <ul>
				 <li><Link to="/">Rubik</Link></li>
				 <li><Link to="/canvas">Canvas</Link></li>
			 </ul>
		 </nav>
		 <Switch>
			 <Route path="/canvas"><CanvasPlayground /></Route>
			 <Route path="/"><Rubik /></Route>
		 </Switch>
	 </Router>)
}