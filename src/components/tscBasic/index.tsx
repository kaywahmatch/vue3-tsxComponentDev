import { defineComponent, ref } from "vue";
import {extendSlots} from '/@/utils/helper/tsxHelper'

const props = {
    title: {
      type: String,
      default: '',
    },
  };

export default defineComponent({

	props,

	slots: ['text', 'title'],

    setup(props, { slots }) {
		
		const number = ref(0);

		const slotKeys = Object.keys(slots); 
		console.log("ð ~ file: index.tsx ~ line 21 ~ setup ~ slotKeys", slotKeys);

		const ret: any = {};
		slotKeys.map((key) => {
			
			ret[key] = () => slotKeys[key];
		});

		const n = extendSlots(slots);
		console.log("ð ~ file: index.tsx ~ line 31 ~ setup ~ n", n)

		const a = Object.keys(n).map(item => {
			console.log("ð ~ file: index.tsx ~ line 46 ~ Object.keys ~ n[item]", n[item], item)
			return () => <div>{n[item]()}</div>
		})
		console.log("ð ~ file: index.tsx ~ line 37 ~ a ~ a", a)
		

		console.log(props)
		console.log(ret)
		// è¿åjsx
		return ()=> (
		// è¿åå€äžªæ ç­Ÿ
		<>
		<h3> { props.title }</h3>
		<div>èŸå¥åå®¹ïŒ{number.value}</div>
		<input type="text" v-model={number.value} />
		{/* {n['title']()} */}
		{
			a.forEach((item, index) => {
				console.log("ð ~ file: index.tsx ~ line 52 ~ setup ~ item", item())
				return () => {a[index]()}
			})
		}
		</>
		)
	}
})