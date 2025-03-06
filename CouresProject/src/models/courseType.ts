export class courseType{
    constructor(
        public id:number,
        public title:string,
        public description:string,
        public teacherId:number,
        public lessons:string[],
        public materials:string[]
    ){}
}

  