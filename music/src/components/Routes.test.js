import React from "react";
import Routes from "./Routes";
import {render} from '@testing-library/react';

it('renders without crashing', function() {
    render(<Routes/>);
});