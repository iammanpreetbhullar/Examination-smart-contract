//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

contract Abc {
    struct Student {
        string name;
        string answers;
    }

    mapping(uint32 => Student) public students;
    mapping(uint32 => uint32) public mappingIdToStudentId;
    uint32 public numberOfStudents;

    function getStudentMarks(uint32 _id)
        public
        view
        returns (
            string memory Name,
            string memory Answers,
            address sender
        )
    {
        return (students[_id].name, students[_id].answers, msg.sender);
    }

    function getAllStudentsMarks()
        public
        view
        returns (
            uint32[] memory ids,
            string[] memory names,
            string[] memory answers,
            address _sender
        )
    {
        uint32[] memory id = new uint32[](numberOfStudents);
        string[] memory name = new string[](numberOfStudents);
        string[] memory answer = new string[](numberOfStudents);
        for (uint32 i; i < numberOfStudents; i++) {
            id[i] = mappingIdToStudentId[i];
            name[i] = students[mappingIdToStudentId[i]].name;
            answer[i] = students[mappingIdToStudentId[i]].answers;
        }

        return (id, name, answer, msg.sender);
    }

    function addMarks(
        uint32 _id,
        string memory _name,
        string memory _ans
    ) public {
        require(bytes(_ans).length > 0, "Cannot save empty answer");

        Student memory student = students[_id];
        if (bytes(student.answers).length == 0) {
            mappingIdToStudentId[numberOfStudents] = _id;
            numberOfStudents = numberOfStudents + 1;
        }
        student.name = _name;
        student.answers = _ans;
        students[_id] = student;
    }
}
