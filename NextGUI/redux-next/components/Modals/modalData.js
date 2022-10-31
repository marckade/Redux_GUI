
// Hold some modal data

const modalData = [
    "This is a tool to help with the learning of Computational Theory",
    "This is the Problem Row. Here, you can select the type of problem you want to learn with.",
    "Once you select the problem type, you can use the dropdown on the right to view and edit the problem instance."
];

let modalDataLength = modalData.length;

export class ModalDataParser {
    getModalData(dataNum) {
        return modalData[dataNum];
    }

    getModalDataLength() {
        return modalDataLength;
    }
}