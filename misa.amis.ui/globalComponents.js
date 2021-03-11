import Vue from 'vue'

import Header from '@/layout/Header';
Vue.component(Header.name, Header);

import Content from '@/layout/Content';
Vue.component(Content.name, Content);

import RegisterOvertime from '@/views/RegisterOvertime';
Vue.component(RegisterOvertime.name, RegisterOvertime);

import RegisterOvertimeForm from '@/views/RegisterOvertimeForm';
Vue.component(RegisterOvertimeForm.name, RegisterOvertimeForm);

import EmployeeForm from '@/views/EmployeeForm';
Vue.component(EmployeeForm.name, EmployeeForm);

import DropdownMenu from '@/components/dropdown'
Vue.component(DropdownMenu.name, DropdownMenu);

import Popup from '@/components/popup'
Vue.component(Popup.name, Popup);

import Grid from '@/components/grid'
Vue.component(Grid.name, Grid);

import Filter from '@/components/filter'
Vue.component(Filter.name, Filter);

import ConditionBox from '@/components/filter/ConditionsBox'
Vue.component(ConditionBox.name, ConditionBox);

import SearchBox from '@/components/search'
Vue.component(SearchBox.name, SearchBox);

import Select from '@/components/select'
Vue.component(Select.name, Select);

import Dialog from '@/components/dialog'
Vue.component(Dialog.name, Dialog);

import ToolTip from '@/components/tooltip'
Vue.component(ToolTip.name, ToolTip);

import ToastMenu from '@/components/toastmenu'
Vue.component(ToastMenu.name, ToastMenu);


