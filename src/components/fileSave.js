import {
	saveAs
} from 'file-saver';
const MoiFileSave = (data, fileName) => {
	saveAs(data, fileName);
}

export default MoiFileSave
