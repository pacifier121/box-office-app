import React, { useState } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import { apiGet } from "../misc/config";
import { useLastQuery } from "../misc/custom-hooks";
import {SearchInput, RadioInputsWrapper, SearchButtonWrapper} from './Home-styled';
import {CustomRadio} from '../components/CustomRadio';


const Home = () => {

    const [input, setInput] = useLastQuery(); 
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState('shows');

    const isShowsSearch = searchOption === 'shows';

    const onInputChange = (ev) => {
        setInput(ev.target.value);
    };

    const onSearch = () => {
        apiGet(`/search/${searchOption}?q=${input}`).then(result => {
            setResults(result);
        });

    };

    const onKeyDown = (ev) => {
        if (ev.key === 'Enter') {
            onSearch();
        }
    };

    const onRadioChange = (ev) => {
        setSearchOption(ev.target.value);
        // console.log(searchOption);
    }

    const renderResults = () => {
        if (results && results.length === 0) {
            return <div>
                No Results.
            </div>
        }

        if (results && results.length > 0) {
            return (
                results[0].show 
                ? (<ShowGrid data={results} /> )
                : (<ActorGrid data={results} />)
                );
        }

        return null;
    }

    return (
        <MainPageLayout>
            <SearchInput
                type="text"
                placeholder="Search for something"
                onChange={onInputChange}
                onKeyDown={onKeyDown}
                value={input}
            />

            <RadioInputsWrapper>
                <div>
                    <CustomRadio
                        label="Shows"
                        id="shows-search" 
                        value="shows" 
                        checked={isShowsSearch}
                        onChange={onRadioChange} 
                    />
                </div>
                <div>
                    <CustomRadio
                        label="Actors"
                        id="actors-search" 
                        value="people" 
                        checked={!isShowsSearch}
                        onChange={onRadioChange} 
                    />
                </div>
            </RadioInputsWrapper>

            <SearchButtonWrapper>
                <button type="button" onClick={onSearch}>
                    Search
                </button>
            </SearchButtonWrapper>
            {renderResults()}
            
        </MainPageLayout>
    )
}

export default Home;

