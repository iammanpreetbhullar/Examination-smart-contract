//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 < 0.9.0;

contract IeltsContract {

   string[]  myString;

    function getArray() public returns (
        string[] memory) {   
            myString = ["manu"];        
            return myString;
        }  

    function push_array(string memory ques, string memory opt) public {      
        myString.push(ques);
        myString.push(opt);     
       
    }

}