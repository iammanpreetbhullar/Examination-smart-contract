export const Cont_Addr = "0x4BCA70a54bACC4b0d53a497305DE9D28861aB899";
export const Cont_ABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "students",
      "outputs": [
        {
          "internalType": "string",
          "name": "Id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "Answers",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_id",
          "type": "string"
        }
      ],
      "name": "getStudentMarks",
      "outputs": [
        {
          "internalType": "string",
          "name": "Id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "Answers",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "Id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "Ans",
          "type": "string"
        }
      ],
      "name": "addMarks",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getArray",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "ans",
          "type": "string"
        }
      ],
      "name": "push_array",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];