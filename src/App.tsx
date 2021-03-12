import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import logo from './logo.svg';
import './App.css';

const axios = require('axios').default;
const defaultState = {
    makes: [],
    models: [],
    trims: [],
    years: [],
    make_id: null,
    model_id: null,
    trim_id: null,
    year: null
}

interface AppState {
    makes: any[],
    models: any[],
    trims: any[],
    years: number[],
    make_id: number | null,
    model_id: number | null,
    trim_id: number | null,
    year: number | null
}

class App extends React.Component<{}, AppState> {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = defaultState
        this.onChangeMake = this.onChangeMake.bind(this)
        this.onChangeModel = this.onChangeModel.bind(this)
        this.onChangeTrim = this.onChangeTrim.bind(this)
        this.onChangeYear = this.onChangeYear.bind(this)
    }

    componentDidMount() {
        this.setMakes()
    }

    onChangeMake = (event: any) => {
        this.setMake(parseInt(event.target.value))
    }
    onChangeModel = (event: any) => {
        this.setModel(parseInt(event.target.value))
    }
    onChangeTrim = (event: any) => {
        this.setTrim(parseInt(event.target.value))
    }
    onChangeYear = (event: any) => {
        this.setYear(parseInt(event.target.value))
    }

    resetState = () => {
        this.setState(defaultState)
        this.setMakes()
    }

    setMakes = () => {
        axios.get('/makes').then((response: any) => {
            const makes = response.data.makes.data.map((make: any) => {
                return make.attributes
            })

            this.setState({ makes: makes })
        })
    }
    setModels = (make_id: number) => {
        axios.get('/models', { params: { make_id: make_id } }).then((response: any) => {
            const models = response.data.models.data.map((model: any) => {
                return model.attributes
            })

            this.setState({ models: models }, () => {
                if (models.length === 1) this.setModel(models[0].id)
            })
        })
    }
    setTrims = (model_id: number) => {
        axios.get('/trims', { params: { model_id: model_id } }).then((response: any) => {
            const trims = response.data.trims.data.map((trim: any) => {
                return trim.attributes
            })

            this.setState({ trims: trims }, () => {
                if (trims.length === 1) this.setTrim(trims[0].id)
            })
        })
    }
    setMake = (make_id: number) => {
        this.setState({
            make_id: make_id, model_id: null, trim_id: null, year: null,
            models: [], trims: [], years: []
        }, () => this.setModels(make_id))
    }
    setModel = (model_id: number) => {
        this.setState({ model_id: model_id, trim_id: null, year: null, trims: [], years: [] },
            () => this.setTrims(model_id))
    }
    setTrim = (trim_id: number) => {
        const years = this.trim(trim_id).years
        this.setState({ trim_id: trim_id, years: years, year: null }, () => {
            if (years.length === 1) this.setYear(years[0])
        })
    }
    setYear = (year: number) => {
        this.setState({ year: year })
    }

    showMakes = () => !!this.state.makes.length
    showModels = () => !!this.state.models.length
    showTrims = () => !!this.state.trims.length
    showYears = () => !!this.state.years.length

    trim = (id: number) => this.state.trims.find((trim: any) => trim.id === id)

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Welcome to ModHub!</h1>
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>Welcome!</p>

                    <div className="container">
                        <div className={this.showMakes() ? 'row' : 'd-none'}>
                            <div className="col"/>
                            <div className="col-4">
                                <select name="make" id="make" className="custom-select"
                                        disabled={!this.showMakes()}
                                        onChange={this.onChangeMake}
                                        value={this.state.make_id || ''}>
                                    <option>Make</option>
                                    {this.state.makes.map((make: any) => (
                                        <option key={make.id} value={make.id}>
                                            {make.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col"/>
                        </div>
                        <div className={this.showModels() ? 'row' : 'd-none'}>
                            <div className="col"/>
                            <div className="col-4">
                                <select name="model" id="model" className="custom-select"
                                        disabled={!this.showModels()}
                                        onChange={this.onChangeModel}
                                        value={this.state.model_id || ''}>
                                    <option>Model</option>
                                    {this.state.models.map((model: any) => (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col"/>
                        </div>
                        <div className={this.showTrims() ? 'row' : 'd-none'}>
                            <div className="col"/>
                            <div className="col-4">
                                <select name="trim" id="trim" className="custom-select"
                                        disabled={!this.showTrims()}
                                        onChange={this.onChangeTrim}
                                        value={this.state.trim_id || ''}>
                                    <option>Trim</option>
                                    {this.state.trims.map((trim: any) => (
                                        <option key={trim.id} value={trim.id}>
                                            {trim.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col"/>
                        </div>
                        <div className={this.showYears() ? 'row' : 'd-none'}>
                            <div className="col"/>
                            <div className="col-4">
                                <select name="year" id="year" className="custom-select"
                                        disabled={!this.showYears()}
                                        onChange={this.onChangeYear}
                                        value={this.state.year || ''}>
                                    <option>Year</option>
                                    {this.state.years.map((year: any) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col"/>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span className="btn-group">
                                    <button type="submit" className="btn btn-primary">
                                        Save
                                    </button>
                                    <button className="btn btn-secondary" onClick={this.resetState}>
                                        Reset
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
