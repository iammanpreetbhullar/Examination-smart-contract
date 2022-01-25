//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 < 0.9.0;

contract IeltsContract {

   string[]  myString;

    function getArray() public view returns (
        string[] memory) {         
            return myString;
        }  

    function push_array(string memory ans) public {      
        myString.push(ans);            
    }

}