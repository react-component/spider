import _ from 'lodash';

export default function searchTree(obj, key, search,path){
  const keyArr = key.split('.');

  var result = _.cloneDeep(obj);
  keyArr.forEach(key => {
    result = result[key];
  });

  if(result === search){ //if search is found return, add the object to the path and return it
    path.push(obj);
    return path;
  }
  else if(obj.children || obj._children){ //if children are collapsed d3 object will have them instantiated as _children
    var children = (obj.children) ? obj.children : obj._children;
    for(var i=0;i<children.length;i++){
      path.push(obj);// we assume this path is the right one
      var found = searchTree(children[i],key, search,path);
      if(found){// we were right, this should return the bubbled-up path from the first if statement
        return found;
      }
      else{//we were wrong, remove this parent from the path and continue iterating
        path.pop();
      }
    }
  }
  else{//not the right object, return false so it will continue to iterate in the loop
    return false;
  }
}
