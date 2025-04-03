const tableModel = require('../models/table.model')



async function getData(req, res) {
    try {
        const data = await tableModel.find()
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal server error" })
    }
}

async function getDataById(req, res) {
    try {
        const { id } = req.params
        const data = await tableModel.findById(id)
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal server error" })
    }
}

async function getDataByName(req, res) {
    try {
        const { name } = req.params
        const data = await tableModel.find({ name: name })
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal server error" })
    }
}

async function getDataByManufacturer(req, res) {
    try {
        const { manufacturer } = req.params
        const data = await tableModel.find({ manufacturer: manufacturer })
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal server error" })
    }
}

async function getDataByModel(req, res) {
    try {
        const { model } = req.params
        const data = await tableModel.find({ model: model })
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal server error" })
    }
}

async function getDataByDriveType(req, res) {
    try {
        const { drive } = req.params
        const data = await tableModel.find({ drive: drive })
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal server error" })
    }
}

async function getDataByPriceRange(req, res) {
    try {
        const { low, high } = req.query
        const data = await tableModel.find({ price: { $gte: low, $lte: high } })
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal server error" })
    }
}

async function getDataByPostingDate(req, res) {
    try {
        const { date } = req.query
        console.log(date)
        const data = await tableModel.find({ createdAt: date })
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal server error" })
    }
}

async function getDataByUpdateDate(req, res) {
    try {
        const { date } = req.query
        console.log(date)
        const data = await tableModel.find({ createdAt: date })
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal server error" })
    }
}

async function editTableData(req, res) {
    try {
        const { id } = req.params

        const data = await tableModel.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    ...req.body,
                    updatedAt: new Date()
                }
            },
            { new: true, runValidators: true }  // Returns the updated document & runs schema validations defined in model
        )

        return res.status(201).json({
            msg: "Updated Successfully",
            data: data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal server error" })
    }
}

async function deleteData(req, res) {
    try {
        const { id } = req.params

        await tableModel.findByIdAndDelete(id)

        return res.status(200).json({ msg: "Deleted Successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal server error" })
    }
}

module.exports = {
    getData, getDataById, getDataByName, getDataByDriveType, getDataByManufacturer, getDataByModel, getDataByPriceRange, getDataByPostingDate, getDataByUpdateDate, editTableData, deleteData
}



