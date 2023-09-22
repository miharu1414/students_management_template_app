import { FC, useEffect, useState } from "react";
import { Box, VStack, theme, Stack, Divider, Button, Select, Heading } from "@chakra-ui/react"

import {   Link } from 'react-router-dom';


import { presentInfo } from "./ExtraAttendContainer";
import { classInfo } from "src/components/features/ExtraSubmit/ExtraAttendContainer";
import SubmitModal from "src/components/features/SubmitStudents/SubmitModal";
import DateSelector from "src/components/common/DataSelector";
import Loading from "src/components/common/Loading";
import { SearchStudentBox } from "src/components/features/ExtraSubmit/SearchStudentBox";
import ExtraAttendItem from "./ExtraAttendItem";

type ExtraAttendProps = {
    children? : Node,

    loading: boolean;
    selectedDate: Date;
    error:boolean;
    classList: classInfo[]
    searchStr: string;
    onChangeSearchStr:(value:string) => void;

  
    studentsInfo: presentInfo[],
    willAddStudentsInfo: presentInfo[],
    onClickUpdate: ()=> void;
    handleDateChange: (value:Date) => void;

    onClickReload:()=>void;
    onClickDelete:()=>void;
    onUpdateClass: (value:string)=>void;
    onClickDeleteStudent: (value:string)=>void;
    onClickAddStudent: (value:string)=>void;
}

const ExtraAttend: FC<ExtraAttendProps> = (props) => {
    const {children, ...rest} = props;



    return (
        <VStack minWidth={"330px"}>  
        <Box display="flex" justifyContent="space-between" width="100%">
            <Box padding={3} border={2} borderColor={"whiteAlpha.200"}
                width={"120px"}
                borderRadius={10}
                backgroundColor={"blue.300"}
                textAlign={"center"}
                textColor={"white"}
                >
                <Link to={"/"}>登校管理
                </Link>
            </Box>
            <Box>
                <DateSelector 
                    selectedDate={rest.selectedDate}
                    handleDateChange={rest.handleDateChange}
                />
            </Box>
        </Box>
            <Box  boxShadow={"sm"}>
                <Select placeholder='クラスを選んでください' onChange={(e)=>rest.onUpdateClass(e.target.value)}>
                    {rest.classList.map((classInstance,index)=> {
                        return (
                            <option value={classInstance.classId} label={classInstance.className} key={index}/>

                        )

                    })}
                </Select>
            </Box>
        <Divider/>
            <SearchStudentBox data={rest.studentsInfo} onClickAddStudent={rest.onClickAddStudent} searchStr={rest.searchStr} onChangeSearchStr={rest.onChangeSearchStr}/>
            <Heading fontSize={"1xl"} marginTop={"8px"}>選択中の生徒</Heading>
            {rest.error ? 
                <Button onClick={rest.onClickReload}>リロード</Button>
                :
                <Loading loading={rest.loading}>
                    <VStack spacing={0} overflowY={"scroll"} width={"70%"}>
                        {typeof(rest.willAddStudentsInfo?.length) !== "undefined" && rest.willAddStudentsInfo?.map((studentInfo, index)=> {
                            return (
                                        <ExtraAttendItem student={studentInfo} key={index} onClick={rest.onClickDeleteStudent}/>
                            )

                        })}


                    </VStack>
                </Loading>
            }
            

            

            
   

            <Box marginY={5}>
                <SubmitModal 
                    title="出席を更新"
                    onUpload={rest.onClickUpdate}
                />
            </Box>
            <Box marginBottom={5}>
                <SubmitModal 
                    title="出席を削除"
                    color="red"
                    onUpload={rest.onClickDelete}
                />
            </Box>
        

        
        </VStack>
        
    )
}

export default ExtraAttend;