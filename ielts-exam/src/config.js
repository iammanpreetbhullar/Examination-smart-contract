export const Cont_Addr = "0xDC4a1DA47EA9AAce97dA265893EC571fD2768D74";
export const Cont_ABI = [
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_id",
				"type": "uint32"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ans",
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
		"name": "getAllStudentsMarks",
		"outputs": [
			{
				"internalType": "uint32[]",
				"name": "ids",
				"type": "uint32[]"
			},
			{
				"internalType": "string[]",
				"name": "names",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "answers",
				"type": "string[]"
			},
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_id",
				"type": "uint32"
			}
		],
		"name": "getStudentMarks",
		"outputs": [
			{
				"internalType": "string",
				"name": "Name",
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
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"name": "mappingIdToStudentId",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "numberOfStudents",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"name": "students",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "answers",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];