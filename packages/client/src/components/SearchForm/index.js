import React, { useState } from 'react'
import { Container, Form, InputGroup, FormControl } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'

export default function SearchForm({
    filterInput,
    searchInput,
    categories,
    onCheckboxChange,
}) {
    const [filteredPlaces, setFilteredPlaces] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const [categories, setCategories] = useState()




    return (
        <Container>
            <Form>
                <div>
                    <InputGroup className='mb-4'>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <FaSearch />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder='Filter'
                            aria-label='Filter'
                            value={searchInput}
                            onChange={filterInput}
                        ></FormControl>
                    </InputGroup>
                </div>

                <div className='my-3'>
                    <Form.Check
                        custom
                        type='checkbox'
                        id='dog'
                        label='Dog'
                        checked={categories['dog']}
                        onChange={onCheckboxChange}
                    />

                    <Form.Check
                        custom
                        type='checkbox'
                        id='cat'
                        label='Cat'
                        checked={categories['cat']}
                        onChange={onCheckboxChange}
                    />
                    <Form.Check
                        custom
                        type='checkbox'
                        id='bird'
                        label='Bird'
                        checked={categories['bird']}
                        onChange={onCheckboxChange}
                    />
                    <Form.Check
                        custom
                        type='checkbox'
                        id='reptile'
                        label='Reptile'
                        checked={categories['reptile']}
                        onChange={onCheckboxChange}
                    />
                </div>

                <div>
                    <Form.Check
                        custom
                        type='checkbox'
                        id='bar'
                        label='Bar'
                        checked={categories['bar']}
                        onChange={onCheckboxChange}
                    />
                    <Form.Check
                        custom
                        type='checkbox'
                        id='restaurant'
                        label='Restaurant'
                        checked={categories['restaurant']}
                        onChange={onCheckboxChange}
                    />
                    <Form.Check
                        custom
                        type='checkbox'
                        id='park'
                        label='Park'
                        checked={categories['park']}
                        onChange={onCheckboxChange}
                    />
                    <Form.Check
                        custom
                        type='checkbox'
                        id='hotel'
                        label='Hotel'
                        checked={categories['hotel']}
                        onChange={onCheckboxChange}
                    />
                </div>
            </Form>
        </Container>
    )
}
