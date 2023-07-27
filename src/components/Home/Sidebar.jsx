import { Box, Checkbox, Heading, Stack, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

function extractNumbersFromString(inputString) {
  const regex = /\d+/g; // Matches one or more digits
  const matches = inputString.match(regex);
  
  if (!matches) {
    return [];
  }
  const matchedNumber=matches.map(match => parseInt(match, 10))
  let exact_Number ={
    min:matchedNumber[0]*1000,
    max:matchedNumber[2]*1000
  }
  if(exact_Number.min===20000){
    return {min:exact_Number.min}
  }
  if(isNaN(exact_Number.max)){
    return {max:exact_Number.min}
  }
  return exact_Number;
}

function Sidebar() {
  const [query,setQuery]=useState("")
  const [filters, setFilters] = useState({
    brands: ['OnePlus', 'boAt', 'realme', 'iQOO', 'Redmi', 'Samsung'],
    selectedBrands: [],
    selectedPriceRange: '',
    selectedItemCondition: ''
  });
  console.log(query)
  useEffect(() => {
    const brandKeywords =filters.selectedBrands.length!==0?filters.selectedBrands.length!==1?`[${filters.selectedBrands}]`:filters.selectedBrands.toString():''
    const min=extractNumbersFromString(filters.selectedPriceRange).min?extractNumbersFromString(filters.selectedPriceRange).min:""
    const max=extractNumbersFromString(filters.selectedPriceRange).max?extractNumbersFromString(filters.selectedPriceRange).max:""

    // Create the query string based on the selected filters
    const queryString = `keywords=${brandKeywords}&price${min&&`[gt]`}=${min}&price${max&&`[lt]`}=${max}`;

    // Update the query state and append to the URL
    setQuery(queryString);
  }, [filters]);
  const handleFilterChange = (filterType) => (event) => {
    const { value, checked } = event.target;

    switch (filterType) {
      case 'brands':
        setFilters((prevState) => {
          if (checked) {
            return {
              ...prevState,
              selectedBrands: [...prevState.selectedBrands, value]
            };
          } else {
            return {
              ...prevState,
              selectedBrands: prevState.selectedBrands.filter((brand) => brand !== value)
            };
          }
        });
        break;
      case 'priceRange':
        setFilters((prevState) => ({
          ...prevState,
          selectedPriceRange: checked ? value : ''
        }));
        break;

      case 'itemCondition':
        setFilters((prevState) => ({
          ...prevState,
          selectedItemCondition: checked ? value : ''
        }));
        break;

      default:
        break;
    }
  };
  return (
    <Box bg={"Background"} w="100%" p="4" overflow={'scroll'} css={{"&::-webkit-scrollbar":{
      display:"none"
    }}} rounded={"0 0 10px 10px"} boxShadow={"lg"}>
      <VStack align="start" spacing="4" >
        <Stack spacing="2">
          <Heading size="sm">Brands</Heading>
          {filters.brands.map((brand) => (
            <Checkbox
              key={brand}
              value={brand}
              isChecked={filters.selectedBrands.includes(brand)}
              onChange={handleFilterChange('brands')}
            >
              {brand}
            </Checkbox> 
          ))}
        </Stack>
        <Stack spacing="2">
          <Heading size="sm">Price Range</Heading>
          <Checkbox
            value="Under ₹1,000"
            isChecked={filters.selectedPriceRange === 'Under ₹1,000'}
            onChange={handleFilterChange('priceRange')}
          >
            Under ₹1,000
          </Checkbox>
          <Checkbox
            value="₹1,000 - ₹5,000"
            isChecked={filters.selectedPriceRange === '₹1,000 - ₹5,000'}
            onChange={handleFilterChange('priceRange')}
          >
            ₹1,000 - ₹5,000
          </Checkbox>
          <Checkbox
            value="₹5,000 - ₹10,000"
            isChecked={filters.selectedPriceRange === '₹5,000 - ₹10,000'}
            onChange={handleFilterChange('priceRange')}
          >
            ₹5,000 - ₹10,000
          </Checkbox>
          <Checkbox
            value="₹10,000 - ₹20,000"
            isChecked={filters.selectedPriceRange === '₹10,000 - ₹20,000'}
            onChange={handleFilterChange('priceRange')}
          >
            ₹10,000 - ₹20,000
          </Checkbox>
          <Checkbox
            value="Over ₹20,000"
            isChecked={filters.selectedPriceRange === 'Over ₹20,000'}
            onChange={handleFilterChange('priceRange')}
          >
            Over ₹20,000
          </Checkbox>
        </Stack>
        <Stack spacing="2">
          <Heading size="sm">Item Condition</Heading>
          <Checkbox
            value="New"
            isChecked={filters.selectedItemCondition === 'New'}
            onChange={handleFilterChange('itemCondition')}
          >
            New
          </Checkbox>
          <Checkbox
            value="Renewed"
            isChecked={filters.selectedItemCondition === 'Renewed'}
            onChange={handleFilterChange('itemCondition')}
          >
            Renewed
          </Checkbox>
          <Checkbox
            value="Used"
            isChecked={filters.selectedItemCondition === 'Used'}
            onChange={handleFilterChange('itemCondition')}
          >
            Used
          </Checkbox>
        </Stack>
      </VStack>
    </Box>
  )
}

export default Sidebar