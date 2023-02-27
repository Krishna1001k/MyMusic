import {View, Text} from 'react-native';
import React, {Fragment, useState} from 'react';
import FormTextInput from './CustomTextInput';

const SearchInput = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <Fragment>
      <FormTextInput
        onChangeText={(txt: string) => setSearchText(txt)}
        placholder={'Search'}
      />
    </Fragment>
  );
};

export default SearchInput;
