import React from 'react'

const axios = require('axios').default
const defaultState = {
    make_id: 0,
    makes: [],
    model_id: 0,
    models: [],
    trim_id: 0,
    trims: [],
    year: 0,
    years: []
}

interface HomeState {
    make_id: number,
    makes: any[],
    model_id: number,
    models: any[],
    trim_id: number,
    trims: any[],
    year: number,
    years: number[]
}

class Home extends React.Component<{}, HomeState> {
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

    isHiddenMakes = () => !this.state.makes.length
    isHiddenModels = () => !this.state.models.length
    isHiddenTrims = () => !this.state.trims.length
    isHiddenYears = () => !this.state.years.length

    onChangeMake = (event: any) => {
        const make_id = parseInt(event.target.value)
        if (!isNaN(make_id)) this.setMake(make_id)
    }
    onChangeModel = (event: any) => {
        const model_id = parseInt(event.target.value)
        if (!isNaN(model_id)) this.setModel(model_id)
    }
    onChangeTrim = (event: any) => {
        const trim_id = parseInt(event.target.value)
        if (!isNaN(trim_id)) this.setTrim(trim_id)
    }
    onChangeYear = (event: any) => {
        const year = parseInt(event.target.value)
        if (!isNaN(year)) this.setYear(year)
    }

    resetState = () => {
        this.setState(defaultState)
        this.setMakes()
    }

    setMake = (make_id: number) => {
        this.setState({
            make_id: make_id, model_id: 0, trim_id: 0, year: 0,
            models: [], trims: [], years: []
        }, () => this.setModels(make_id))
    }
    setModel = (model_id: number) => {
        this.setState({
            model_id: model_id, trim_id: 0, year: 0, trims: [], years: []
        }, () => this.setTrims(model_id))
    }
    setTrim = (trim_id: number) => {
        this.setState({
            trim_id: trim_id, year: 0, years: []
        }, () => this.setYears(trim_id))
    }
    setYear = (year: number) => {
        this.setState({ year: year })
    }

    setMakes = () => {
        axios.get('/makes').then((response: any) => {
            const makes = response.data.data.map((make: any) => {
                return make.attributes
            })

            this.setState({ makes: makes }, () => {
                if (makes.length === 1) this.setMake(makes[0].id)
            })

        })
    }
    setModels = (make_id: number) => {
        axios.get('/models', { params: { make_id: make_id } })
            .then((response: any) => {
                const models = response.data.data.map((model: any) => {
                    return model.attributes
                })

                this.setState({ models: models }, () => {
                    if (models.length === 1) this.setModel(models[0].id)
                })
            })
    }
    setTrims = (model_id: number) => {
        axios.get('/trims', { params: { model_id: model_id } }).then((response: any) => {
            const trims = response.data.data.map((trim: any) => {
                return trim.attributes
            })

            this.setState({ trims: trims }, () => {
                if (trims.length === 1) this.setTrim(trims[0].id)
            })
        })
    }
    setYears = (trim_id: number) => {
        const years = this.state.trims.find((trim: any) => trim.id === trim_id).years

        this.setState({ years: years }, () => {
            if (years.length === 1) this.setYear(years[0])
        })
    }

    render() {
        return (
            <div className="container">
                <h1>ModHub</h1>
                <div className={this.isHiddenMakes() ? 'd-none' : 'row'}>
                    <div className="col-4">
                        <select name="make" id="make" className="custom-select"
                                disabled={this.isHiddenMakes()}
                                onChange={this.onChangeMake}
                                value={this.state.make_id}>
                            <option>Make</option>
                            {this.state.makes.map((make: any) => (
                                <option key={make.id} value={make.id}>
                                    {make.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={this.isHiddenModels() ? 'd-none' : 'row'}>
                    <div className="col-4">
                        <select name="model" id="model" className="custom-select"
                                disabled={this.isHiddenModels()}
                                onChange={this.onChangeModel}
                                value={this.state.model_id}>
                            <option>Model</option>
                            {this.state.models.map((model: any) => (
                                <option key={model.id} value={model.id}>
                                    {model.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={this.isHiddenTrims() ? 'd-none' : 'row'}>
                    <div className="col-4">
                        <select name="trim" id="trim" className="custom-select"
                                disabled={this.isHiddenTrims()}
                                onChange={this.onChangeTrim}
                                value={this.state.trim_id}>
                            <option>Trim</option>
                            {this.state.trims.map((trim: any) => (
                                <option key={trim.id} value={trim.id}>
                                    {trim.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={this.isHiddenYears() ? 'd-none' : 'row'}>
                    <div className="col-4">
                        <select name="year" id="year" className="custom-select"
                                disabled={this.isHiddenYears()}
                                onChange={this.onChangeYear}
                                value={this.state.year}>
                            <option>Year</option>
                            {this.state.years.map((year: any) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
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
        )
    }
}

export default Home
