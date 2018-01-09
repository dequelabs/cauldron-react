import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'jsdom-global/register';
import 'ignore-styles';

configure({ adapter: new Adapter() });
global.requestAnimationFrame = cb => setTimeout(cb);
