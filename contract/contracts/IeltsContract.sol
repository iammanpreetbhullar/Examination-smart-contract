//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

contract IeltsContract {
    struct Student {
        string Id;
        string Answers;
    }

    Student student;

    mapping(string => Student) public students;

    function getStudentMarks(string memory _id)
        public
        view
        returns (
            string memory Id,
            string memory Answers,
            address sender
        )
    {
        Student memory s = students[_id];
        return (s.Id, s.Answers, msg.sender);
    }

    function addMarks(string memory Id, string memory Ans) public {
        student = Student(Id, Ans);
        // students[Id] =  student;
    }

    string[] myString;

    function getArray() public view returns (string[] memory) {
        return myString;
    }

    function push_array(string memory ans) public {
        myString.push(ans);
    }
}
