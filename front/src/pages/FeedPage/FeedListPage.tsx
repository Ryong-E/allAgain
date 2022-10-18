import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getFeedList } from "../../api/feedApi";
import {
  Container,
  Container1300,
  PageTitle,
  PageWrap,
} from "../../components/common/Containers";
import FeedAddButton from "../../components/Feed/FeedAddButton";
import FeedList from "../../components/Feed/FeedList";
import FeedCategoryFilter from "../../components/Feed/FeedCategoryFilter";
import { useEffect, useState } from "react";

interface CategoryState {
  [key: string]: boolean;
}

const initialState: CategoryState = {
  전체: true,
  플라스틱: false,
  섬유: false,
  나무: false,
  종이: false,
  유리: false,
  금속: false,
  고무: false,
  "그 외": false,
};

function FeedListPage() {
  const { isSuccess, data } = useQuery(["feeds"], getFeedList, {
    refetchOnWindowFocus: false,
  });

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryState>(initialState);

  const handleCategoryButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const eventValue = (event.target as HTMLButtonElement).value;
    if (eventValue !== "전체")
      setSelectedCategory({
        ...selectedCategory,
        [eventValue]: !selectedCategory[eventValue],
        전체: false,
      });
    else setSelectedCategory(initialState);
  };

  useEffect(() => {
    if (!Object.values(selectedCategory).includes(true))
      setSelectedCategory(initialState);
  }, [selectedCategory]);

  return (
    <PageWrap>
      <PageTitle>다시, 다 사용하다</PageTitle>
      <Container>
        <Container1300>
          <FeedListOptionsContainer>
            <FeedCategoryFilter
              onClick={handleCategoryButtonClick}
              selectedCategory={selectedCategory}
            />
            <FeedAddButton />
          </FeedListOptionsContainer>
          {isSuccess && (
            <FeedList
              feeds={data.filter(({ category }) => {
                const categoryList: string[] = [];
                Object.keys(selectedCategory).forEach((key) => {
                  if (selectedCategory[key]) categoryList.push(key);
                });
                for (const filterCategory in categoryList)
                  if (category.includes(filterCategory)) return true;
                return false;
              })}
              isSimple={false}
            />
          )}
        </Container1300>
      </Container>
    </PageWrap>
  );
}

const FeedListOptionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default FeedListPage;
