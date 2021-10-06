import React from "react";
import Navbar from "./Navbar";
import {render} from '@testing-library/react';

it('renders without crashing', function() {
    render(<Navbar/>);
});