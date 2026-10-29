import { test } from 'node:test';
import assert from 'node:assert/strict';
import { object, validate } from '../src/schema.js';
test('recursive arrays, numbers, null and closed object validation fail closed',()=>{
  const schema=object({rows:{type:'array',minItems:1,maxItems:2,items:object({value:{anyOf:[{type:'number',minimum:0,maximum:5},{type:'null'}]}},['value'])}},['rows']);
  validate(schema,{rows:[{value:2.5},{value:null}]});
  for(const data of [{rows:[]},{rows:[{value:Infinity}]},{rows:[{value:'2'}]},{rows:[{value:6}]},{rows:[{value:1,hidden:true}]},{rows:[{}]},[],null])assert.throws(()=>validate(schema,data));
  assert.throws(()=>validate({type:'integer'},Number.MAX_SAFE_INTEGER+1));
  assert.throws(()=>validate({type:'array',items:{type:'string'},uniqueItems:true},['same','same']));
  assert.throws(()=>validate({type:'string',unknownKeyword:true},'value'),/Unsupported/);
  assert.throws(()=>validate({anyOf:[{type:'string'},{type:'number',unknownKeyword:true}]},'value'),/Unsupported/);
  assert.throws(()=>validate({type:'array',items:{type:'string'}},new Array(2)));
  assert.throws(()=>validate({type:'something'},'value'),/unsupported/i);
});
