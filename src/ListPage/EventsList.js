import React, { useContext, useEffect } from "react";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { NavLink, useRouteMatch } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Community from "../addElement/community";
import NotalCommunity from "../addElement/notal_community";
import { ShowContext } from "../context/show/showContext";
import { ReduceContext } from "../context/reducerContext";
import ResultCardAll from "../addElement/resultcardall";
import NoteList from "../addElement/NoteList";
import { NoteState } from "../context/noteReducer/noteState";
import CreateNote from "../addElement/createNote";
//Страница Событий
function EventsList() {
  const {
    number_all,
    Fetch_one_events,
    none,
    add_notal_card,
    update_notal_card
  } = useContext(ReduceContext);


  const { url } = useRouteMatch();
  function handleClick() {
    let numbers = url.replace(/\D+/g, "");
    number_all(numbers, url);
  }
  useEffect(() => {
    Fetch_one_events(url.replace(/\D+/g, ""));
  }, []);

  return (
    <div className="container_list">
      <div className="button_header">
        <NavLink to={"/event"}>
          <div className="purple">
            <SvgLoader path="../../img/Arrow2.svg">
              <SvgProxy selector="#cst" />
            </SvgLoader>
            Назад
          </div>
        </NavLink>
      </div>
      {none.one_event && (
        <div>
          <div className="header_unite">
            <div className="unit_left">
              <div className="elipse_profiler">
                <div className="text_all_image">{none.one_event.name[0]}</div>
              </div>
              <div className="text_big_all name_profile">
                {none.one_event.name}
              </div>
              <NavLink
                to={`/event/${none.one_event.id}/edit`}
                onClick={handleClick}
              >
                <div className="edit_profile">Изменить</div>
              </NavLink>
            </div>
            <div className="unit_button_right">
            {none.data_notal === undefined ? (
                <Button
                  onClick={() => {
                    add_notal_card(none.one_event.type, none.one_event.id);
                  }}
                >
                  Расчитать натальную карту
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    update_notal_card(none.data_notal.id);
                  }}
                >
                  Перерасчитать натальную карту
                </Button>
              )}
            </div>
          </div>
          <div className="unit_grid">
            {none.one_event.description && (
              <div className="unit_info_adress">
                <div className="unit_info_right">Краткое описание:</div>
                <div className="text_events">{none.one_event.description}</div>
              </div>
            )}

            <div className="unit_info_contact">
              <div className="d_flex_center">
                <div className="unit_info_left">День рождения:</div>
                <div className="unit_info_right">
                  {none.one_event.event_date}
                </div>
              </div>
              {none.one_event.city !== null ? (
                <div className="d_flex_center">
                  <div className="unit_info_left">Город:</div>
                  <div className="unit_info_right">{none.one_event.city}</div>
                </div>
              ) : null}

              <div className="d_flex_center">
                <div className="unit_info_left">Часовой пояс:</div>
                <div className="unit_info_right">
                  GMT+{none.one_event.timezone}
                </div>
              </div>
            </div>
          </div>
          <ResultCardAll
            Birthday={none.one_event.event_date}
            Time={none.one_event.event_time}
            NameNotal={"НАТАЛЬНАЯ КАРТА CОБЫТИЯ"}
          ></ResultCardAll>
          <Community></Community>
          <NotalCommunity></NotalCommunity>
          <NoteState>
            <CreateNote
              ID={none.one_event.id}
              Type={none.data_id !== undefined ? none.data_id.type_link : false}
            ></CreateNote>
            <NoteList
              ID={none.one_event.id}
              Type={none.data_id !== undefined ? none.data_id.type_link : false}
            ></NoteList>
          </NoteState>
        </div>
      )}
    </div>
  );
}
export default EventsList;

// import React, { useContext, useEffect } from "react";
// import { SvgLoader, SvgProxy } from "react-svgmt";
// import {
//   NavLink,
//   useRouteMatch,
//   matchPath,
//   useHistory
// } from "react-router-dom";
// import { Button } from "semantic-ui-react";
// import Community from "../addElement/community";
// import NotalCommunity from "../addElement/notal_community";
// import ResultCardAll from "../addElement/resultcardall";
// import { ShowContext } from "../context/show/showContext";
// import NoteList from "../addElement/NoteList";
// import { NoteState } from "../context/noteReducer/noteState";
// import { ReduceContext } from "../context/reducerContext";
// import CreateNote from "../addElement/createNote";
// //Страница компании
// function CompanyList() {

//   const { url } = useRouteMatch();
//   const {
//     number_all,
//     Fetch_one_company,
//     none,
//     add_notal_card,
//     update_notal_card
//   } = useContext(ReduceContext);
//   const history = useHistory();
//   useEffect(() => {
//     Fetch_one_company(url.replace(/\D+/g, ""));
//   }, [url]);

//   function handleClick() {
//     let numbers = url.replace(/\D+/g, "");
//     number_all(numbers, url);
//   }

//   return (
//     <div className="container_list">
//       <div className="button_header">
//         <div className="purple" onClick={() => history.goBack()}>
//           <SvgLoader path="../../img/Arrow2.svg">
//             <SvgProxy selector="#cst" />
//           </SvgLoader>
//           Назад
//         </div>
//       </div>

//       {none.one_company && (
//         <div>
//           <div className="header_unite">
//             <div className="unit_left">
//               <div className="elipse_profiler">
//                 {none.one_company.image !== null ? (
//                   <img
//                     src={
//                       "http://1690550.masgroup.web.hosting-test.net" +
//                       none.one_company.image
//                     }
//                     alt="Картинка"
//                   />
//                 ) : (
//                   <div className="text_all_image">
//                     {none.one_company.name[0]}
//                   </div>
//                 )}
//               </div>
//               <div className="text_big_all name_profile">
//                 {none.one_company.name}
//               </div>
//               <NavLink
//                 to={`/company/${none.one_company.id}/edit`}
//                 onClick={handleClick}
//               >
//                 <div className="edit_profile">Изменить</div>
//               </NavLink>
//             </div>
//             <div className="unit_button_right">
//               {none.data_notal === undefined ? (
//                 <Button
//                   onClick={() => {
//                     add_notal_card(none.one_company.type, none.one_company.id);
//                   }}
//                 >
//                   Расчитать натальную карту
//                 </Button>
//               ) : (
//                 <Button
//                   onClick={() => {
//                     update_notal_card(none.data_notal.id);
//                   }}
//                 >
//                   Перерасчитать натальную карту
//                 </Button>
//               )}
//             </div>
//           </div>
//           <div className="unit_grid">
//             {none.one_company.email !== null &&
//             none.one_company.telephone !== null ? (
//               <div className="unit_info_contact">
//                 {none.one_company.telephone !== null ? (
//                   <div className="d_flex_center">
//                     <div className="unit_info_left">Телефон:</div>
//                     <div className="unit_info_right">
//                       {none.one_company.telephone}
//                     </div>
//                   </div>
//                 ) : (
//                   <div></div>
//                 )}

//                 {none.one_company.email !== null ? (
//                   <div className="d_flex_center">
//                     <div className="unit_info_left">Email:</div>
//                     <div className="unit_info_right">
//                       {none.one_company.email}
//                     </div>
//                   </div>
//                 ) : (
//                   <div></div>
//                 )}
//               </div>
//             ) : null}

//             <div className="unit_info_adress">
//               <div className="d_flex_center">
//                 <div className="unit_info_left">Дата основания:</div>
//                 <div className="unit_info_right">
//                   {none.one_company.birth_date}
//                 </div>
//               </div>
//               {none.one_company.city && (
//                 <div className="d_flex_center">
//                   <div className="unit_info_left">Город:</div>
//                   <div className="unit_info_right">{none.one_company.city}</div>
//                 </div>
//               )}
//             </div>
//             {none.one_company.osnovatel === null ||
//             none.one_company.cnt_workers ? (
//               <div className="unit_info_company">
//                 {none.one_company.osnovatel && (
//                   <div className="d_flex_center">
//                     <div className="unit_info_left">Основатель:</div>
//                     <div className="unit_info_right">
//                       {none.one_company.osnovatel}
//                     </div>
//                   </div>
//                 )}

//                 {none.one_company.cnt_workers && (
//                   <div className="d_flex_center">
//                     <div className="unit_info_left">
//                       Количестов сотрудников:
//                     </div>
//                     <div className="unit_info_right">
//                       {none.one_company.cnt_workers} чел.
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : null}
//           </div>

//           <ResultCardAll
//             Birthday={none.one_company.birth_date}
//             Time={none.one_company.birth_time}
//             NameNotal={"НАТАЛЬНАЯ КАРТА КОМПАНИИ"}
//           ></ResultCardAll>
//           <Community></Community>
//           <NotalCommunity></NotalCommunity>
//           <NoteState>
//             <CreateNote
//               ID={none.one_company.id}
//               Type={none.data_id !== undefined ? none.data_id.type_link : false}
//             ></CreateNote>
//             <NoteList
//               ID={none.one_company.id}
//               Type={none.data_id !== undefined ? none.data_id.type_link : false}
//             ></NoteList>
//           </NoteState>
//         </div>
//       )}
//     </div>
//   );
// }
// export default CompanyList;
