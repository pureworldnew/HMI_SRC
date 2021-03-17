const ResponseFormat = require('../../core').ResponseFormat;
var ContractService = require('../../services/revenue/contract.service');
var contractService = new ContractService();
module.exports = {

    /**
     * Get Contract dropdown list
     * @param {token} req 
     * @param {companyList} res 
     */
    async getContractsDropdownList(req, res) {
        let { roleId, companyId } = req.user;

        let response = await contractService.findDropdownList(roleId, companyId);
        if (response.status == false) {
            res.status(400).json(ResponseFormat.error(
                response.error,
                "Something went wrong when retrieve company list",
                "error"
            ))
        } else {
            res.status(200).json(ResponseFormat.build(
                response.data,
                "contract company list",
                200,
                "success"
            ))
        }
    },


    /**
     * Get contract data including pagination and filter
     * @param {token, companyName} req 
     * @param {contractData} res 
     */
    async getContractData(req, res) {
        let { roleId, companyId } = req.user;
        let filterParams = req.params;

        let response = await contractService.findContractData(roleId, companyId, filterParams);
        if (response.status == false) {
            res.status(400).json(ResponseFormat.error(
                response.error,
                "Something went wrong when retrieve contract data",
                "error"
            ))
        } else {
            res.status(200).json(ResponseFormat.build(
                { 'result': response.data, 'totalCount': response.total, 'pages': response.pages },
                "contract data",
                200,
                "success"
            ))
        }
    },


    /**
     * Get contract waterfall data including pagination and filter
     * @param {token, companyName, segment, topXX, period} req 
     * @param {waterfallData} res 
     */
    async getWaterfallData(req, res) {
        let { roleId, companyId } = req.user;
        let filterParams = req.params;

        let response = await contractService.findWaterfallData(roleId, companyId, filterParams);
        if (response.status == false) {
            res.status(400).json(ResponseFormat.error(
                response.error,
                "Something went wrong when retrieve waterfall data",
                "error"
            ))
        } else {
            res.status(200).json(ResponseFormat.build(
                { 'result': response.data, 'totalCount': response.total, 'pages': response.pages },
                "contract waterfall data",
                200,
                "success"
            ))
        }
    },


    /**
     * Get expring table data including pagination and filter
     * @param {token, companyName} req 
     * @param {expringTableData} res 
     */
    async getExpriginData(req, res) {
        let { roleId, companyId } = req.user;
        let filterParams = req.params;

        let response = await contractService.findExpringTableData(roleId, companyId, filterParams);
        if (response.status == false) {
            res.status(400).json(ResponseFormat.error(
                response.error,
                "Something went wrong when retrieve expring data for table",
                "error"
            ))
        } else {
            res.status(200).json(ResponseFormat.build(
                { 'result': response.data, 'totalCount': response.total, 'pages': response.pages },
                "expring data for table",
                200,
                "success"
            ))
        }
    },


    /**
     * Get contract management card data
     * @param {token} req 
     * @param {activeContractCnt, totalContractVal, avgContractVal, revLossExp, nextRevLossExp, expContract, nextExpContract} res 
     */
    async contractsCard(req, res) {
        let { roleId, companyId } = req.user;

        let response = await contractService.getContractCard(roleId, companyId);
        if (response.status == false) {
            res.status(400).json(ResponseFormat.error(
                response.error,
                "Something went wrong when retrieve contract card data",
                "error"
            ))
        } else {
            res.status(200).json(ResponseFormat.build(
                response.data,
                "contract card data",
                200,
                "success"
            ))
        }
    },


    /**
     * Get expring chart data
     * @param {token, CompanyName} req 
     * @param {expiringChartData} res 
     */
    async expiringChart(req, res) {
        let { roleId, companyId } = req.user;
        let filterParams = req.params;

        let response = await contractService.findExpiringChartData(roleId, companyId, filterParams);
        if (response.status == false) {
            res.status(400).json(ResponseFormat.error(
                response.error,
                "Something went wrong when retrieve expring data for chart",
                "error"
            ))
        } else {
            res.status(200).json(ResponseFormat.build(
                response.data,
                "expiring chart data!",
                200,
                "success"
            ))
        }
    },


    /**
     * Get revenue loss exposure chart data
     * @param {companyName} req 
     * @param {*} res 
     */
    async revenueLossExposure(req, res) {
        let { roleId, companyId } = req.user;
        let filterParams = req.params;

        let response = await contractService.getRevenueLossExposure(roleId, companyId, filterParams);
        if (response.status == false) {
            res.status(400).json(ResponseFormat.error(
                response.error,
                "Something went wrong when retrieve revenue loss exposure data for chart",
                "error"
            ))
        } else {
            res.status(200).json(ResponseFormat.build(
                response.data,
                "revenue loss exposure chart data!",
                200,
                "success"
            ))
        }
    },


    /**
     * Get Segment Data
     * @param {companyName} req 
     * @param {*} res 
     */
    async getSegmentData(req, res) {
        let { roleId, companyId } = req.user;
        let filterParams = req.params;

        let response = await contractService.findSegmentData(roleId, companyId, filterParams);
        if (response.status == false) {
            res.status(400).json(ResponseFormat.error(
                response.error,
                "Something went wrong when retrieve revenue loss exposure data for chart",
                "error"
            ))
        } else {
            res.status(200).json(ResponseFormat.build(
                response.data,
                "revenue loss exposure chart data!",
                200,
                "success"
            ))
        }
    },

}
