import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
    Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,HelpBlock,
    Checkbox,Radio,Grid,Row,Col,
    Table, Modal
} from 'react-bootstrap';


class App extends Component {



    state = {
        name: "",
        color: "",
        email: "",
        movies: [],
        gender: "",
        suggestion:"",
        satisfy: "",
        records:[],
        show: false,
        selectedName: "",
        selectedColor: "",
        selectedEmail: "",
        selectedMovies: [],
        selectedGender: "",
        selectedSuggestion:"",
        selectedSatisfy:"",

        seledtedId: ""





    };



    componentDidMount(){

        this.refreshData();
    }



     refreshData=()=>{

         httpClient.get('http://localhost:3004/surveys')
             .then((response)=> {
                 var data =response.data;
                 this.setState({
                     records:data.reverse()
                 })

             }).catch((error)=> {

             });

     };

    onChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

     modalonChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

    checkboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };

     modalcheckboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state.selectedMovies;
            state[fieldName] = targetArray;
            this.setState(state.selectedMovies);
        }
    };



    saveSurvey = ()=> {
        var data = {name: this.state.name,
                        color: this.state.color,
                        email: this.state.email,
                        gender: this.state.gender,
                        suggestion: this.state.suggestion,
                        satisfy: this.state.satisfy,
                        movies: this.state.movies};
         
      console.log(data);
         delete data.records;



        httpClient.post('http://localhost:3004/surveys',
         data)
            .then((response)=> {
                this.refreshData();
            }).catch((error)=> {

            });
            location.reload();

    };

    deleteItem = (id)=>{

        return ()=>{

            httpClient.delete('http://localhost:3004/surveys/'+ id )
                .then((response)=> {

                    this.refreshData();
                }).catch((error)=> {

                });

        };
    };


     editItem = (id) =>{
        return ()=> {
            
            httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    console.log('edit');
                    var data = response.data
                    console.log(response.data);
                    this.setState({
                        name: data.name,
                        color: data.color
                    })
                }).catch((error)=>{
                    
                });
        };
    };

    openModal = (id)=>{

            return ()=>{
                this.setState({
                    show: true
                })

                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                        selectedName: data.name,
                        selectedColor: data.color,
                        selectedEmail: data.email,
                        selectedMovies: data.movies,
                        selectedGender: data.gender,
                        selectedSuggestion: data.suggestion,
                        selectedSatisfy: data.satisfy,
                        selectedId: data.id

                    })
                    console.log(this.state.selectedData.name);
                }).catch((error)=>{
                    
                });

            };
        };

    

    saveEdit = (id) =>{


        return () => {
            console.log(data);
            var data = {name: this.state.selectedName,
                        color: this.state.selectedColor,
                        email: this.state.selectedEmail,
                        gender: this.state.selectedGender,
                        suggestion: this.state.selectedSuggestion,
                        satisfy: this.state.selectedSatisfy,
                        movies: this.state.selectedMovies};
            delete data.records;

            httpClient.patch('http://localhost:3004/surveys/'+id,
            data)
                .then((response)=> {
                    this.refreshData();
                }).catch((error)=> {

                });

            this.setState({
                show: false,
                selectedName: "",
                selectedColor: "",
                selectedEmail: "",
        selectedMovies: [],
        selectedGender: "",
        selectedSuggestion:"",
        selectedSatisfy:"",

        
            });
        }
    };







    render() {

        var rows  = this.state.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td><Button bsSize="medium" bsStyle="default" onClick={this.deleteItem(item.id)}>
  <span className="glyphicon glyphicon-trash"></span></Button>
  <br/>
  
                    <Button bsSize="medium" bsStyle="default" onClick={this.openModal(item.id)}>
  <span className="glyphicon glyphicon-pencil"></span></Button></td>
                    <td>{item.id}</td> 
                     <td className="textfieldarea">{item.name}</td>
                     <td>{item.gender}</td>
                     <td>{item.satisfy}</td>
                     <td>{item.color}</td>
                     <td>{
                         item.movies.map((movie, mi)=> {
                             return <div key={mi}>
                                   <span className="label label-default">{movie}</span>
                                 </div>
                         })

                      }
                     </td>
                     
                     <td className="textfieldarea">{item.suggestion}</td>
                     <td className="textfieldarea">{item.email}</td>
                </tr>
            );
        });

        let close = () => this.setState({ show: false })

        return (
            <div className="container">
                <div className="page-header">
        
                   Book Cafe
                <h3>Customer Survey</h3>
          
                </div>
                <div className="jumbotron">
                    
                                <Form>
                                <div className="panel">
                                    <FormGroup>
                                        <ControlLabel><h4>Name or Alias ...</h4></ControlLabel>
                                       
                                        <FormControl
                                            type="text"
                                            placeholder="Name here..."
                                            value={this.state.name}
                                            onChange={this.onChange('name')}
                                            />

                                        <HelpBlock>Use to identify you</HelpBlock>
                                    </FormGroup>
                                    </div>

                                        <div className="panel">
                                        <FormGroup>
                                        <ControlLabel><h4>Gender</h4> </ControlLabel>
                                        <Radio name="gender" value="♂Male"
                                               onChange={this.onChange('gender')}>Male</Radio>
                                        <Radio name="gender" value="♀Female"
                                               onChange={this.onChange('gender')}>Female</Radio>
                                    </FormGroup>
                                    <br/>

                                     <FormGroup>
                                        <ControlLabel><h4>Are You Satisfy with Our Service?</h4></ControlLabel>
                                        <Radio name="satisfy" value="Yes"
                                               onChange={this.onChange('satisfy')}>Yes</Radio>
                                        <Radio name="satisfy" value="No"
                                               onChange={this.onChange('satisfy')}>No</Radio>
                                    </FormGroup>


                                    <br/>
                                    <FormGroup>
                                        <ControlLabel><h4>Rate Our Service from 1 to 5</h4></ControlLabel>
                                        <div className="pselect">
                                        <FormControl componentClass="select"
                                                     placeholder="Rate here..."
                                                     value={this.state.color}
                                                     onChange={this.onChange('color')}
                                            >

                                    
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </FormControl>
                                         </div>
                                        <HelpBlock>Feel Free to Rate Us</HelpBlock>

                                    </FormGroup> 
                                    <br/>
                                   

                                    <FormGroup>
                                        <ControlLabel><h4>Favorite Genres of Books</h4> </ControlLabel>
                                        <Checkbox value="Science fiction"
                                                  checked={this.state.movies.indexOf('Science fiction')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Science fiction
                                        </Checkbox>
                                        <Checkbox value="Satire"
                                                  checked={this.state.movies.indexOf('Satire')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Satire
                                        </Checkbox>
                                        <Checkbox value="Drama"
                                                  checked={this.state.movies.indexOf('Drama')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Drama
                                        </Checkbox>
                    <Checkbox value="Action and Adventure"
                                                  checked={this.state.movies.indexOf('Action and Adventure')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Action and Adventure
                                        </Checkbox>
                    <Checkbox value="Romance"
                                                  checked={this.state.movies.indexOf('Romance')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Romance
                                        </Checkbox>
                    <Checkbox value="Mystery"
                                                  checked={this.state.movies.indexOf('Mystery')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Mystery
                                        </Checkbox>
                    <Checkbox value="Horror"
                                                  checked={this.state.movies.indexOf('Horror')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Horror
                                        </Checkbox>
                    <Checkbox value="Health"
                                                  checked={this.state.movies.indexOf('Health')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Health
                                        </Checkbox>
                    <Checkbox value="Math"
                                                  checked={this.state.movies.indexOf('Math')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Math
                                        </Checkbox>
                    <Checkbox value="History"
                                                  checked={this.state.movies.indexOf('History')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            History
                                        </Checkbox>
                    <Checkbox value="Poetry"
                                                  checked={this.state.movies.indexOf('Poetry')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Poetry
                                        </Checkbox>
                    <Checkbox value="Encyclopedias"
                                                  checked={this.state.movies.indexOf('Encyclopedias')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Encyclopedias
                                        </Checkbox>
                    <Checkbox value="Dictionaries"
                                                  checked={this.state.movies.indexOf('Dictionaries')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Dictionaries
                                        </Checkbox>
                    <Checkbox value="Cookbooks"
                                                  checked={this.state.movies.indexOf('Cookbooks')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Cookbooks
                                        </Checkbox>
                    <Checkbox value="Biographies"
                                                  checked={this.state.movies.indexOf('Biographies')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>
                                            Biographies
                                        </Checkbox>
                                    </FormGroup>
                                    
                                   
                                    <br/>
                                      
                                <FormGroup>  
                <ControlLabel><h4>Any Comments/Compliments About Our Service???</h4></ControlLabel><br/>
                                        <textarea
                                            type="textarea"
                                            placeholder="Let us know ..."
                                            value={this.state.suggestion}
                                            onChange={this.onChange('suggestion')}
                                            cols = "65"
                                            rows = "5"
                                            />
                                    </FormGroup></div>
                                    <br/>
                                    
                                    <div className="panel">
                                       <FormGroup>
                                        <ControlLabel><h4>Please include your email address for occasional mailings including offers and specials. (optional)</h4></ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="eg. Example@gmail.com"
                                            value={this.state.email}
                                            onChange={this.onChange('email')}
                                            />
                                        <HelpBlock>Use to identify you</HelpBlock>
                                    </FormGroup>


                                    <ButtonGroup>

                                        <Button bsStyle="primary" onClick={this.saveSurvey}>Save Survey</Button>

                                    </ButtonGroup></div>
                                </Form>
                           
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                                <Table condensed striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Satisfaction</th>
                                        <th>Rating</th>
                                        <th>Fav. Books from our Bookshelf</th>
                                        <th>Compliments/Comments/Suggestions</th>
                                        <th>Customers email</th>
                                    </tr>
                                    </thead>
                                    
                                    <tbody>
                                  {rows}
                                    </tbody>
                                </Table>
                                </div>
                                











                                <div className="modal-container" style={{height: 200}}>
                    <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    >
                    <Modal.Header closeButton >

                        <Modal.Title id="contained-modal-title"><center>Edit Area</center></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                     <Form>
                                <div className="panel">
                                    <FormGroup style={{width: 550}}>
                                        <ControlLabel>Name or Alias ...</ControlLabel>
                                       
                                        <FormControl
                                            type="text"
                                            placeholder="Name here..."
                                            value={this.state.selectedName}
                                            onChange={this.modalonChange('selectedName')}
                                            />

                                        <HelpBlock>Use to identify you</HelpBlock>
                                    </FormGroup>
                                    </div>

                                        <div className="panel">
                                        <FormGroup>
                                        <ControlLabel>Gender </ControlLabel>
                                        <Radio name="selectedGender" value="♂Male"
                                               onChange={this.modalonChange('selectedGender')}>Male</Radio>
                                        <Radio name="selectedGender" value="♀Female"
                                               onChange={this.modalonChange('selectedGender')}>Female</Radio>
                                    </FormGroup>
                                    

                                     <FormGroup>
                                        <ControlLabel>Are You Satisfy with Our Service?</ControlLabel>
                                        <Radio name="selectedSatisfy" value="Yes"
                                               onChange={this.modalonChange('selectedSatisfy')}>Yes</Radio>
                                        <Radio name="selectedSatisfy" value="No"
                                               onChange={this.modalonChange('selectedSatisfy')}>No</Radio>
                                    </FormGroup>


                                    <br/>
                                    <FormGroup>
                                        <ControlLabel>Rate Our Service from 1 to 5</ControlLabel>
                                        <div className="pselect">
                                        <FormControl componentClass="select"
                                                     placeholder="Rate here..."
                                                     value={this.state.selectedColor}
                                                     onChange={this.modalonChange('selectedColor')}
                                            >

                                    
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </FormControl>
                                         </div>

                                        <HelpBlock>Feel Free to Rate Us</HelpBlock>

                                    </FormGroup> 
                                    <br/>
                                   

                                    <FormGroup>
                                        <ControlLabel><h4>Favorite Genres of Books</h4> </ControlLabel>
                                        <Checkbox value="Science fiction"
                                                  checked={this.state.selectedMovies.indexOf('Science fiction')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Science fiction
                                        </Checkbox>
                                        <Checkbox value="Satire"
                                                  checked={this.state.selectedMovies.indexOf('Satire')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Satire
                                        </Checkbox>
                                        <Checkbox value="Drama"
                                                  checked={this.state.selectedMovies.indexOf('Drama')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Drama
                                        </Checkbox>
                    <Checkbox value="Action and Adventure"
                                                  checked={this.state.selectedMovies.indexOf('Action and Adventure')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Action and Adventure
                                        </Checkbox>
                    <Checkbox value="Romance"
                                                  checked={this.state.selectedMovies.indexOf('Romance')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Romance
                                        </Checkbox>
                    <Checkbox value="Mystery"
                                                  checked={this.state.selectedMovies.indexOf('Mystery')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Mystery
                                        </Checkbox>
                    <Checkbox value="Horror"
                                                  checked={this.state.selectedMovies.indexOf('Horror')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Horror
                                        </Checkbox>
                    <Checkbox value="Health"
                                                  checked={this.state.selectedMovies.indexOf('Health')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Health
                                        </Checkbox>
                    <Checkbox value="Math"
                                                  checked={this.state.selectedMovies.indexOf('Math')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Math
                                        </Checkbox>
                    <Checkbox value="History"
                                                  checked={this.state.selectedMovies.indexOf('History')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            History
                                        </Checkbox>
                    <Checkbox value="Poetry"
                                                  checked={this.state.selectedMovies.indexOf('Poetry')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Poetry
                                        </Checkbox>
                    <Checkbox value="Encyclopedias"
                                                  checked={this.state.selectedMovies.indexOf('Encyclopedias')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Encyclopedias
                                        </Checkbox>
                    <Checkbox value="Dictionaries"
                                                  checked={this.state.selectedMovies.indexOf('Dictionaries')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Dictionaries
                                        </Checkbox>
                    <Checkbox value="Cookbooks"
                                                  checked={this.state.selectedMovies.indexOf('Cookbooks')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Cookbooks
                                        </Checkbox>
                    <Checkbox value="Biographies"
                                                  checked={this.state.selectedMovies.indexOf('Biographies')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>
                                            Biographies
                                        </Checkbox>
                                    </FormGroup>
                                    
                                   
                                    <br/>
                                      
                                <FormGroup>  
                <ControlLabel>Any Comments/Compliments About Our Service???</ControlLabel><br/>
                                        <textarea
                                            type="textarea"
                                            placeholder="Let us know ..."
                                            value={this.state.selectedSuggestion}
                                            onChange={this.modalonChange('selectedSuggestion')}
                                            cols = "65"
                                            rows = "5"
                                            />
                                    </FormGroup></div>
                                    <br/>
                                    
                                    <div className="panel">
                                       <FormGroup style={{width: 550}}>
                                        <ControlLabel>Please include your email address for occasional mailings including offers and specials. (optional)</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="eg. Example@gmail.com"
                                            value={this.state.selectedEmail}
                                            onChange={this.modalonChange('selectedEmail')}
                                            />
                                        <HelpBlock>Use to identify you</HelpBlock>
                                    </FormGroup>


                                    <ButtonGroup>

                                    <Button bsStyle="success" onClick={this.saveEdit(this.state.selectedId)}>Save Changes</Button>

                                    </ButtonGroup></div>
                                </Form>
                                            
                            </Modal.Body>
                        </Modal>
                          

               </div>
            </div>
        );
    }
}

export default App;