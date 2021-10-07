import React from 'react';
import {render, cleanup, waitForElement} from '@testing-library/react';
// import 'jest-dom/extend-expect';
import axiosMock from 'axios';
import {Provider} from 'react-redux';
import Navbar from './Navbar';


afterEach(cleanup);

it('show nav bar', async () => {
    render(
        <Provider>
            <Navbar/>
        </Provider>
    );
});