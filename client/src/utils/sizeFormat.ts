export default (size: number):string => {
    let formattedSize: string = size.toString();
    if(size > 1024 *1024 *1024) formattedSize =  (size/(1024 *1024 *1024)).toFixed(1) + ' GB';
    if(size > 1024 *1024) formattedSize = (size/(1024 *1024)).toFixed(1) + ' MB';
    if(size > 1024) formattedSize = (size/(1024)).toFixed(1) + ' KB';
    if(size <= 1024) formattedSize = formattedSize + ' bytes';
    return formattedSize;
}