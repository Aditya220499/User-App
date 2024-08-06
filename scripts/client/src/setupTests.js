import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { server } from "./mock/server";

beforeAll(() => {
    server.listen()
    console.error = console.warn = console.log =()=>{};
});

afterAll(() => {
    server.close()
});

afterEach(() => {
    server.resetHandlers();
    cleanup();
    window.history.pushState({},document.title,'/')
});

