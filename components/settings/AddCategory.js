import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import ModalContainer from '../styles/modal/ModalContainer'
import ModalInner from '../styles/modal/ModalInner'
import WidgetHeader from '../styles/widget/WidgetHeader'
import WidgetRow from '../styles/widget/WidgetRow'
import WidgetFooter from '../styles/widget/WidgetFooter'
import Form from '../styles/Form'
import Button from '../styles/Button'

import { ALL_CATEORIES_QUERY } from './Categories'

const CREATE_CATEGORY_MUTATION = gql`
  mutation CREATE_CATEGORY_MUTATION(
    $name: String!, 
    $description: String!, 
    $categoryFields: [CategoryFieldCreateWithoutCategoryInput]
  ) {
    createCategory(
      name: $name
      description: $description
      categoryFields: $categoryFields
    ){
      name
      description
    }
  }
`

// TODO add icons to buttons

// TODO avatars upload + default typography avatar

// TODO remove refetch queries once using pagination and cache clearing

// TODO improve errors

// TODO only scroll on middle widget container

class AddUser extends Component {
  scrollableWidget = React.createRef()

  state = {
    name: '',
    description: '',
    categoryFields: []
  }

  handleChange = e => {
    const { name, id } = e.target.dataset

    if(['fieldName', 'fieldType'].includes(name)){
      const categoryFields = [...this.state.categoryFields]
      categoryFields[id][name] = e.target.value

      return this.setState({ categoryFields })
    }

    this.setState({ [e.target.name]: e.target.value })
  }

  onCompleted = () => {
    this.setState({
      name: '',
      description: '',
      categoryFields: [{fieldName: '', fieldType: 'STRING'}]
    })

    this.props.closeModal()
  }
  
  addCustomField = e => {
    this.setState(state => ({
      categoryFields: [...state.categoryFields, {fieldName: '', fieldType: 'STRING'}]
    }), () => {
      // scroll to bottom of container if it's scrolalble
      const widget = this.scrollableWidget
      widget.scrollTop = widget.offsetHeight
    })
  }

  createCategory = (createCategory) => createCategory({
    variables: {
      ...this.state,
      categoryFields: this.state.categoryFields
        .filter(field => field.fieldName !== '')
    }
  })

  removeField = i => this.setState(state => ({
    categoryFields: state.categoryFields
      .filter((field, index) => index !== i)
  }))

  render() {
    const { showModal, closeModal } = this.props
    const { name, description, categoryFields } = this.state

    return showModal ? (
      <Mutation 
        mutation={CREATE_CATEGORY_MUTATION}
        refetchQueries={[{ query: ALL_CATEORIES_QUERY }]}
        onCompleted={this.onCompleted}
      >
        {(createCategory, { error, loading }) => (
          <ModalContainer onClick={closeModal}>
            <ModalInner onClick={(e) => e.stopPropagation()}>
              <WidgetHeader>
                <h3>Create New Category</h3>
                <button 
                  className="close"
                  onClick={closeModal}
                >X</button>
              </WidgetHeader>
              <WidgetRow 
                modal
                ref={(el) => this.scrollableWidget = el} 
              >
                {error && <p>{error.message}</p>}
                <UserForm>
                  <label htmlFor="name">Category Name
                    <input 
                      onChange={this.handleChange}
                      name="name"  
                      type="text"
                      value={name}
                      placeholder="Category Name"
                    ></input>
                  </label>
    
                  <label htmlFor="email">Category description
                    <textarea 
                      onChange={this.handleChange}
                      name="description"  
                      type="text"
                      value={description}
                      placeholder="This category is for..."
                    ></textarea>
                  </label>

                  <label htmlFor="categoryFields">
                    Cusom Category Feilds
                    <span>These are optional, category specific, fields that appear in addition to the default fields.</span>
                  </label>

                  {categoryFields.map((categoryField, i) => {
                    const fieldNameName = 'fieldName' + i
                    const fieldTypeName = 'fieldType' + i
                    
                    return (
                      <fieldset 
                        name="categoryFields" 
                        key={'categoryFields' + i}
                        className={i > 0 ? 'no-margin' : ''}  
                      >
                        
                        <div className="flex flex--removable">
                          <label htmlFor={fieldNameName}>{!i && 'Field Name'}
                            <input 
                              name={fieldNameName}
                              type="text"
                              placeholder="Field Name"
                              onChange={this.handleChange}
                              value={this.state.categoryFields[i].fieldName}
                              data-id={i}
                              data-name='fieldName'
                            />
                          </label>

                          <label htmlFor={fieldTypeName}>{!i && 'Field Type'}
                            <select
                              name={fieldTypeName}
                              onChange={this.handleChange}
                              value={this.state.categoryFields[i].fieldType}
                              data-id={i}
                              data-name='fieldType'
                            >
                              <option value="STRING">Text</option>
                              <option value="DATE">Date</option>
                              <option value="INT">Number</option>
                              <option value="ASSET">File</option>
                            </select>
                          </label>

                          <button 
                            onClick={() => this.removeField(i)}
                            type="button"
                          >X</button>
                        </div>
                      </fieldset>
                    )
                  })}
                  
                  <AddNew>
                    <Button 
                      onClick={this.addCustomField}
                      type="button"  
                      primary
                    >
                      Add new field
                    </Button>
                  </AddNew>

                </UserForm>
              </WidgetRow>
    
              <WidgetFooter>
                <Button 
                  onClick={closeModal}
                >Cancel</Button>
                <Button 
                  secondary 
                  onClick={() => this.createCategory(createCategory)}
                  disabled={loading}
                >
                  Create Category
                </Button>
              </WidgetFooter>
            </ModalInner>
          </ModalContainer>
        )}
      </Mutation>
    ) : null
  }
}


// TODO Move this in to option to style via prop since it's in two places now

const UserForm = styled(Form)`
  padding: 0;

  label:first-of-type {
    margin-top: 0px;
  }
`

// TODO should this be part of the form styling component ? Make form a folder ? 

const AddNew = styled.div`
  border-top: 1px solid #eaedf2;
  margin-top: 20px;
  padding-top: 20px;
  text-align: right;
  margin-bottom: 10px;
`

export default AddUser