import React from "react";
import Home from "./Home";
import {render} from '@testing-library/react';

it('renders without crashing', function() {
    render(<Home/>);
});