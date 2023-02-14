class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }


    // this is a search bar for the product you want to find
    search(){
        const keyword = this.queryStr.keyword?
        {
            name:{
                $regex:this.queryStr.keyword,
                $options:'i',
            }
        }:{}
        // console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }

    // filter
    filter(){
        const querycopy = {...this.queryStr};
        
        // console.log(querycopy);

        //removing some fields for category
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach(key=> delete querycopy[key]) 
    
        // Filter for price
        // console.log(querycopy)

        let queryStr = JSON.stringify(querycopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key => `$${key}`)
        
        // console.log(queryStr);
        // console.log(querycopy);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }


    // Pagination
    pagination(resultPerPage){
        
        const currentPage = Number(this.queryStr.page) || 1;   //     12/6 = 2 pages total
        
        const skip = resultPerPage*(currentPage-1)

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this
    }
    
};

module.exports = ApiFeatures