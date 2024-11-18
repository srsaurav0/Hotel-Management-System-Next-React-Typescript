"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Header_1 = __importDefault(require("../components/Header"));
// import Footer from '../components/Footer';
const HomePage = () => {
    return (<div>
            <Header_1.default />
            <main>
                <h1>About Us</h1>
                <p>This is the about page content.</p>
            </main>
            {/* <Footer /> */}
        </div>);
};
exports.default = HomePage;
