import { screen, render } from "@testing-library/react";
import { it, expect, describe, vi, beforeEach } from "vitest";
import { userEvent } from "@testing-library/user-event";
import axios from "axios";
import HomePage from "./HomePage.jsx";

vi.mock('axios');

describe('Home Page Component',()=>{
    let loadCart;

    beforeEach(()=>{
        loadCart=vi.fn();
    })

    it('displays products correct',()=>{
        render(<HomePage cart={[]} loadCart={loadCart}/>)
    })
})