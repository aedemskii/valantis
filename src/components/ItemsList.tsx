import '../styles/ItemsList.css';
import { TItem } from '../assets/types';

export const ItemsList = ( {items, startIndex} : {items: TItem[], startIndex: number}) => {
  return (
    <table className='items-table'>
      <thead className='items-table-header'>
        <tr>
          <th className='items-table-header-number'></th>
          <th className='items-table-header-name'>Name</th>
          <th className='items-table-header-brand'>Brand</th>
          <th className='items-table-header-price'>Price</th>
          <th className='items-table-header-id'>ID</th>
        </tr>
      </thead>
      <tbody className='items-list'>
        {items.map((item, index) => (
          <tr key={item.id} className='items-list-item'>
            <td className='items-list-item-number'>{startIndex + index}</td>
            <td className='items-list-item-name'>{item.name}</td>
            <td className='items-list-item-brand'>{item.brand}</td>
            <td className='items-list-item-price'>{item.price}</td>
            <td className='items-list-item-id'>{item.id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}