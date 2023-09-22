// src/components/SumpleHeader
import { FC, useContext, useState} from "react"
import { Box, Button, Flex, HStack, Icon, Select, Input, VStack } from "@chakra-ui/react";
import { userContext } from "src/hooks/UserInfo";
import { presentInfo } from "./ExtraAttendContainer";

import { AiOutlineSearch } from "react-icons/ai";
import ExtraAttendItem from "./ExtraAttendItem";
import SearchListItem from "./SearchListItem";

type SearchStudentBoxProps = {
    children? : Node;
    data: presentInfo[]
    onClickAddStudent:(value:string)=>void;
    searchStr: string;
    onChangeSearchStr: (value:string)=>void;
}

export const SearchStudentBox: FC<SearchStudentBoxProps> = (props) => {
    const {children, ...rest} = props;
    const ctx = useContext(userContext);

    
    function calculateLevenshteinDistance(a: string, b:string) {
        const dp = Array(a.length + 1)
          .fill(null)
          .map(() => Array(b.length + 1).fill(null));
      
        for (let i = 0; i <= a.length; i++) {
          dp[i][0] = i;
        }
      
        for (let j = 0; j <= b.length; j++) {
          dp[0][j] = j;
        }
      
        for (let i = 1; i <= a.length; i++) {
          for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
              dp[i - 1][j] + 1, // Deletion
              dp[i][j - 1] + 1, // Insertion
              dp[i - 1][j - 1] + cost // Substitution
            );
          }
        }
      
        return dp[a.length][b.length];
      }

      function filterAndSortData(searchStr:string, data:presentInfo[]) {
        // 類似度に基づいてデータをソートする
        data?.sort((a, b) => {
          const similarityA = Math.min(
            calculateLevenshteinDistance(a.name, searchStr),
            calculateLevenshteinDistance(a.kana, searchStr)
          );
      
          const similarityB = Math.min(
            calculateLevenshteinDistance(b.name, searchStr),
            calculateLevenshteinDistance(b.kana, searchStr)
          );
      
          return similarityA - similarityB;
        });
      
        return data;
      }
      
  
    filterAndSortData(rest.searchStr, rest.data);
      

      
      
    
  return (

        <VStack spacing={0} border={"1px"} borderColor={"gray.200"} borderRadius={"5px"} boxShadow={"sm"}>
            <HStack bgColor="gray.50" borderRadius="10px">
                <Icon
                  as={AiOutlineSearch}
                  fontSize="27px"
                  color="teal.500"
                  ml="8px"
                  w="50px"
                />
                <Input
                  border="none"
                  outline="transparent solid 2px"
                  placeholder="Search the docs"
                  value={rest.searchStr}
                  onChange={(e)=>rest.onChangeSearchStr(e.target.value)}
                  w="200px"
                  h="65px"
                />


              </HStack>
          
              {rest.searchStr !=""  && filterAndSortData(rest.searchStr, rest.data)?.slice(0,3).map((data,index)=>{
                    return (
                    <SearchListItem student={data} key={index} onClickStudent={rest.onClickAddStudent}/>
                    )
                    
                })}

 



        </VStack>
            
  );
};

