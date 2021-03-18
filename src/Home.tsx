import React from 'react'

const axios = require('axios').default
const defaultState = {
    kinds: [],
    makes: [],
    models: [],
    trims: [],
    years: [],
    kind: null,
    make_id: null,
    model_id: null,
    trim_id: null,
    year: null
}

interface AppState {
    kinds: any[],
    makes: any[],
    models: any[],
    trims: any[],
    years: number[],
    kind: string | null,
    make_id: number | null,
    model_id: number | null,
    trim_id: number | null,
    year: number | null
}

class Home extends React.Component<{}, AppState> {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = defaultState
        this.onChangeKinds = this.onChangeKinds.bind(this)
        this.onChangeMakes = this.onChangeMakes.bind(this)
        this.onChangeModels = this.onChangeModels.bind(this)
        this.onChangeTrims = this.onChangeTrims.bind(this)
        this.onChangeYears = this.onChangeYears.bind(this)
    }

    componentDidMount() {
        this.setKinds()
    }

    isHiddenKinds = () => !this.state.kinds.length
    isHiddenMakes = () => !this.state.makes.length
    isHiddenModels = () => !this.state.models.length
    isHiddenTrims = () => !this.state.trims.length
    isHiddenYears = () => !this.state.years.length

    onChangeKinds = (event: any) => {
        const kind = event.target.value
        if (!!kind) this.setKind(kind)
    }
    onChangeMakes = (event: any) => {
        const make_id = parseInt(event.target.value)
        if (!isNaN(make_id)) this.setMake(make_id)
    }
    onChangeModels = (event: any) => {
        const model_id = parseInt(event.target.value)
        if (!isNaN(model_id)) this.setModel(model_id)
    }
    onChangeTrims = (event: any) => {
        const trim_id = parseInt(event.target.value)
        if (!isNaN(trim_id)) this.setTrim(trim_id)
    }
    onChangeYears = (event: any) => {
        const year = parseInt(event.target.value)
        if (!isNaN(year)) this.setYear(year)
    }

    resetState = () => {
        this.setState(defaultState)
        this.setKinds()
    }

    setKinds = () => {
        axios.get('/kinds').then((response: any) => {
            const kinds = response.data

            this.setState({ kinds: kinds }, () => {
                if (kinds.length === 1) this.setKind(kinds[0])
            })
        })
    }
    setMakes = (kind: string) => {
        axios.get('/makes', { params: { kind: kind } }).then((response: any) => {
            const makes = response.data.data.map((make: any) => {
                return make.attributes
            })

            this.setState({ makes: makes }, () => {
                if (makes.length === 1) this.setMake(makes[0].id)
            })

        })
    }
    setModels = (make_id: number) => {
        axios.get('/models', { params: { make_id: make_id, kind: this.state.kind } })
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

    setKind = (kind: string) => {
        this.setState({
            kind: kind, make_id: null, model_id: null, trim_id: null, year: null,
            makes: [], models: [], trims: [], years: []
        }, () => this.setMakes(kind))
    }
    setMake = (make_id: number) => {
        this.setState({
            make_id: make_id, model_id: null, trim_id: null, year: null,
            models: [], trims: [], years: []
        }, () => this.setModels(make_id))
    }
    setModel = (model_id: number) => {
        this.setState({
            model_id: model_id, trim_id: null, year: null, trims: [], years: []
        }, () => this.setTrims(model_id))
    }
    setTrim = (trim_id: number) => {
        this.setState({
            trim_id: trim_id, year: null, years: []
        }, () => this.setYears(trim_id))
    }
    setYear = (year: number) => {
        this.setState({ year: year })
    }

    render() {
        return (
            <div className="container">
                <h1>ModHub</h1>
                <div className={this.isHiddenKinds() ? 'd-none' : 'row'}>
                    <div className="col-4">
                        <select name="kind" id="kind" className="custom-select"
                                disabled={this.isHiddenKinds()}
                                onChange={this.onChangeKinds}
                                value={this.state.kind || ''}>
                            <option>Kind</option>
                            {this.state.kinds.map((kind: any) => (
                                <option key={kind.id} value={kind.id}>
                                    {kind.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={this.isHiddenMakes() ? 'd-none' : 'row'}>
                    <div className="col-4">
                        <select name="make" id="make" className="custom-select"
                                disabled={this.isHiddenMakes()}
                                onChange={this.onChangeMakes}
                                value={this.state.make_id || ''}>
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
                                onChange={this.onChangeModels}
                                value={this.state.model_id || ''}>
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
                                onChange={this.onChangeTrims}
                                value={this.state.trim_id || ''}>
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
                                onChange={this.onChangeYears}
                                value={this.state.year || ''}>
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
