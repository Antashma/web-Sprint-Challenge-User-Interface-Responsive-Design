import { fireEvent, getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fail } from 'assert';

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let dom;
let container;

describe('index.html', () => {
    beforeEach(() => {
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        // This is indeed dangerous and should only be done with trusted content.
        // https://github.com/jsdom/jsdom#executing-scripts
        dom = new JSDOM(html, { runScripts: 'dangerously' });
        container = dom.window.document.body;
    })

    it('renders a header title', () => {
        const headerTitle = container.querySelector('h1').innerHTML;
        const regex = /BLOOMTECH BAR AND GRILL/i;
        expect(headerTitle).toMatch(regex);
    });

    it('renders the correct four links in header nav', () => {
        const headerNavLinks = container.querySelector('.links');

        let headerNavLinkTextArr = headerNavLinks.innerHTML.split(/<a /i);
        console.log(headerNavLinkTextArr);
        let headerNavLinkCount = 0;
        for(let i = 0; i < headerNavLinkTextArr.length; i++) {
            if(headerNavLinkTextArr[i].includes('href')) {
                const index = headerNavLinkTextArr[i].indexOf('href');
                console.log(index);
                headerNavLinkTextArr = headerNavLinkTextArr.splice(index);
                console.log(headerNavLinkTextArr);
                headerNavLinkCount++;
            }
        }
        console.log(headerNavLinkCount);

        expect(getByText(headerNavLinks, /Menu/i)).toBeInTheDocument();
        expect(getByText(headerNavLinks, /Reservations/i)).toBeInTheDocument();
        expect(getByText(headerNavLinks, /Special Offers/i)).toBeInTheDocument();
        expect(getByText(headerNavLinks, /Contact/i)).toBeInTheDocument();
        expect((headerNavLinkCount).toMatch(4));
    });

    // it('renders a new paragraph via JavaScript when the button is clicked', async () => {
    //     const button = getByText(container, 'Click me for a terrible pun');

    //     fireEvent.click(button);
    //     let generatedParagraphs = container.querySelectorAll('#pun-container p');
    //     expect(generatedParagraphs.length).toBe(1);

    //     fireEvent.click(button);
    //     generatedParagraphs = container.querySelectorAll('#pun-container p');
    //     expect(generatedParagraphs.length).toBe(2);

    //     fireEvent.click(button);
    //     generatedParagraphs = container.querySelectorAll('#pun-container p');
    //     expect(generatedParagraphs.length).toBe(3);
    // });
});