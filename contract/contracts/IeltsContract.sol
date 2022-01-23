//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 < 0.9.0;

contract IeltsContract {

   uint public count = 0;

    struct Contact {
        uint id;
        string name;
        string phone;
    }

    constructor() {
        createContact("Manpreet Singh", "phone");
    }

    mapping(uint256 => Contact) public contacts;

    event ContactCreated(uint id, string name, string phone);

    function createContact(string memory _name, string memory _phone) public {
        count ++;
        contacts[count] = Contact(count, _name, _phone);
        emit ContactCreated(count, _name, _phone);
    }

}