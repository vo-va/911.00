'use strict';
(function() {

var max_multiple = 300;
var minimal_wage = 22859

var ErrorP = React.createClass({
	render : function () {
		return (
			<p className="errors__p" key={this.props.key}>{this.props.error_text}</p>
		);
	}
});


var Period = React.createClass({
	handleChange : function(event) {
		this.props.period_change(event.target.value);
	},
	render : function() {
		var class_arr = ['form__input-elm', 'period'];

		var errors = [];
		if (this.props.errors){
			class_arr.push('form__input-elm--error');
			for(var i = 0; i < this.props.errors.length; i++) {
				errors.push(this.props.errors[i]);
			}
		}
		return (
			<div className="form__item">
				<div className="form__input-container">
					<label className="form__label">
							<span className="form__text-label">Срок действия патента в месяцах</span>
					</label>
					<input tabIndex="2" className={class_arr.join(' ')} type="text" value={this.props.period} onChange={this.handleChange} />
				</div>
				<div className="form__errors">
					{errors}
				</div>
			</div>
		);
	}
});

var Pensioner = React.createClass({
	handleChange : function(event) {
		this.props.pensioner_change(event.target.checked);
	},
	render : function() {
		var class_arr = ['form__input-checkbox-elm', 'pensioner'];

		var errors = [];
		if (this.props.errors){
			class_arr.push('form__input-elm--error');
			for(var i = 0; i < this.props.errors.length; i++) {
				errors.push(this.props.errors[i]);
			}
		}
		return (
			<div className="form__item">
				<div className="form__input-container">
					<label className="form__label">
							<span className="form__text-label">Являюсь пенсионером</span>
							<span className="form__text-label--explain">
								<ExplainLink explain_html={this.props.pensioner_explain} explain_click={ this.props.handle_explain_click } input_element="pensioner" />
							</span>
					</label>
					<input tabIndex="1" className={class_arr.join(' ')} type="checkbox" checked={this.props.pensioner} onChange={this.handleChange} />
				</div>
				<div className="form__errors">
					{errors}
				</div>
				<div className="form__explain_popup">
					<ExplainDiv explain_info={ this.props.explain } hide_explain={ this.props.hide_explain } />
				</div>
			</div>
		);
	}
});


var IncomeInput = React.createClass({
	handleChange: function(event) {
		this.props.income_change(event.target.value);
	},
	handleClick: function(event) {
		this.props.income_change(event.target.text);
	},
	render: function() {
		var class_arr = ['form__input-elm', 'income'];
		var errors = [];
		var explain_popup;
		if (this.props.errors){
			class_arr.push('form__input-elm--error');
			for(var i = 0; i < this.props.errors.length; i++) {
				errors.push(this.props.errors[i]);
			}
		}
		return (
			<div className="form__item">
				<div className="form__input-container">
					<label className="form__label">
							<span className="form__number-label">911.00.001</span>
							<span className="form__number-label--stroke"></span>
							<span className="form__text-label">Доход</span>
					</label>
					<input tabIndex="3" className={class_arr.join(' ')} type="text" value={this.props.income} onChange={this.handleChange} />
				</div>
				<div className="form__errors">
				{errors}
				</div>
				<div className="form__explain_popup">
				<ExplainDiv explain_info={ this.props.explain } hide_explain={ this.props.hide_explain } />
				</div>
			</div>
		);
	}
});

var PatentCosts = React.createClass({

	render: function() {
		var class_arr = ['form__input-elm', 'patent_cost', 'form__input-elm--read-only'];
		return (
			<div className="form__item">
			<div className="form__input-container">
					<label className="form__label">
							<span className="form__number-label">911.00.002</span>
							<span className="form__number-label--stroke"></span>
							<span className="form__text-label">Сумма исчисленных налогов (911.00.001 × 2%)</span>
					</label>
					<input tabIndex="-1" className={class_arr.join(' ')} type="text" value={this.props.patent_cost} readOnly />
			</div>
			</div>
		);
	}
});

var PersonalIncomeTax = React.createClass({
	render: function() {
		var class_arr = ['form__input-elm', 'personal_income_tax', 'form__input-elm--read-only'];
		return (
			<div className="form__item">
			<div className="form__input-container">
					<label className="form__label">
							<span className="form__number-label">911.00.003</span>
							<span className="form__number-label--stroke"></span>
							<span className="form__text-label">Сумма индивидуального подоходного налога, подлежащего уплате в бюджет (911.00.002 × 0,5)</span>
					</label>
			<input tabIndex="-1" className={class_arr.join(' ')} type="text" value={this.props.amount} readOnly/>
			</div>
			</div>
		);
	}
});

var SocialTax = React.createClass({
	render: function() {
		var class_arr = ['form__input-elm', 'social_tax', 'form__input-elm--read-only'];
		return (
			<div className="form__item">
			<div className="form__input-container">
					<label className="form__label">
							<span className="form__number-label">911.00.004</span>
							<span className="form__number-label--stroke"></span>
							<span className="form__text-label">Сумма социального налога, подлежащего уплате в бюджет ((911.00.002 × 0,5) - 911.00.005)</span>
					</label>
			<input tabIndex="-1" className={class_arr.join(' ')} type="text" value={this.props.amount} readOnly />
			</div>
			</div>
		);
	}
});

var IncomeTaxed = React.createClass({
	handleChange: function(event) {
		this.props.income_taxed_change(event.target.value);
	},
	render: function() {
		var class_arr = ['form__input-elm', 'income_taxed'];
		if (this.props.readOnly) {
			class_arr.push('form__input-elm--read-only');
		}

		var errors = [];
		if (this.props.errors){
			class_arr.push('form__input-elm--error');
			for(var i = 0; i < this.props.errors.length; i++) {
				errors.push(this.props.errors[i]);
			}
		}
		return (
			<div className="form__item">
			<div className="form__input-container">
					<label className="form__label">
							<span className="form__number-label">911.00.006</span>
							<span className="form__number-label--stroke"></span>
							<span className="form__text-label">Заявленный доход для исчисления обязательных пенсионных взносов</span>
					</label>
			<input tabIndex="4" className={class_arr.join(' ')} type="text" value={this.props.amount} onChange={this.handleChange} readOnly={this.props.readOnly} />
			</div>
			<div className="form__errors">
				{errors}
			</div>
			<div className="form__explain_popup">
				<ExplainDiv explain_info={ this.props.explain } hide_explain={ this.props.hide_explain } />
			</div>
			</div>
		);
	}
});

var MandatorySSC = React.createClass({
	render: function() {
		var class_arr = ['form__input-elm', 'mandatory_ssc', 'form__input-elm--read-only'];
		return (
			<div className="form__item">
			<div className="form__input-container">
					<label className="form__label">
							<span className="form__number-label">911.00.005</span>
							<span className="form__number-label--stroke"></span>
							<span className="form__text-label">Сумма социальных отчислений</span>
					</label>
			<input tabIndex="-1" className={class_arr.join(' ')} type="text" value={this.props.amount} readOnly />
			</div>
			</div>
		);
	}
});

var MandatoryPC = React.createClass({
	handleChange: function(event) {
		this.props.mandatory_pc_change(event.target.value);
	},

	render: function() {
		var class_arr = ['form__input-elm', 'mandatory_pc'];
		if (this.props.readOnly) {
			class_arr.push('form__input-elm--read-only');
		}

		var errors = [];
		if (this.props.errors){
			class_arr.push('form__input-elm--error');
			for(var i = 0; i < this.props.errors.length; i++) {
				errors.push(this.props.errors[i]);
			}
		}
		return (
			<div className="form__item">
			<div className="form__input-container">
			<label className="form__label">
					<span className="form__number-label">911.00.007</span>
					<span className="form__number-label--stroke"></span>
					<span className="form__text-label">Сумма обязательных пенсионных взносов</span>
			</label>
			<input tabIndex="5" className={class_arr.join(' ')} type="text" value={this.props.amount} onChange = {this.handleChange} readOnly={this.props.readOnly}/>
			</div>
			<div className="form__errors">
				{errors}
			</div>
			<div className="form__explain_popup">
				<ExplainDiv explain_info={ this.props.explain } hide_explain={ this.props.hide_explain } />
			</div>
			</div>
		);
	}
});

var ExplainLink = React.createClass({
	getInitialState: function () {
		return null;
	},

	handle_click: function(event) {
		var link_position = event.target.getBoundingClientRect();
		var form = document.getElementsByTagName('form')[0];
		var form_position = form.getBoundingClientRect();
		this.props.explain_click({
			input_element : this.props.input_element,
			explain_html : {'__html' :this.props.explain_html},
			form_position : form_position,
			link_position : link_position
		});
	},
	render: function() {
		return <a className="form__explain-link" href="#" onClick={this.handle_click}> [?]</a>;
	}
});


var ExplainDiv = React.createClass({
	getInitialState: function() {
		return {
			display_state : 'hide'
		};
	},
	hide_explain : function() {
		this.props.hide_explain();
	},
	handle_click : function(event) {
		event.stopPropagation();
	},
	componentDidUpdate : function() {
		var new_top_offset;
		var div_rect;
		var div_style;
		var dom_node;
		if (this.display_state === 'show') {
			dom_node =  ReactDOM.findDOMNode(this);
			div_rect = dom_node.getClientRects()[0];
			new_top_offset = this.props.explain_info.link_position.top - (div_rect.height / 2);
			div_style = [
				'display: block; position : absolute; top: ' ,
				new_top_offset.toString() , 'px',
				'; left : ' , this.props.explain_info.form_position.left.toString() , 'px',
				'; width :', this.props.explain_info.form_position.width.toString(), 'px',
				';'].join('');
			dom_node.setAttribute('style', div_style);
		}
	},
	render : function() {
		if (this.props.explain_info === undefined){
			this.display_state = 'hide';
			return null;
		}
		this.display_state = 'show';
		return <div className="form_explain-div" onMouseLeave={ this.hide_explain } style={this.css_style} onClick={this.handle_click}>
		<div className="explain-div__p" dangerouslySetInnerHTML={this.props.explain_info.explain_html}></div>
		</div>;
	}
})


var PatentForm = React.createClass({
	getInitialState: function() {
		return {
			pensioner: false,
			period : 1,
			income : 1 * minimal_wage,
			social_tax : 0,
			income_taxed : 1 * minimal_wage,
			mandatory_pc : Math.round(0.1 * minimal_wage),
			explain_info : {},
		};
	},

	handlePeriodChange: function(new_value) {
		this.setState({period : new_value});
	},
	handlePensionerChange: function(new_value) {
		this.setState({pensioner : new_value });
	},
	handleIncomeChange: function(new_value) {
		this.setState({income : new_value});
	},
	handleIncomeTaxedChange: function(new_value) {
		this.setState({income_taxed : new_value});
	},
	handleMandatoryPCChange: function(new_value) {
		this.setState({mandatory_pc : new_value});
	},

	handle_click_fabric: function(handler) {
		return function(event) {
			var value = parseFloat(event.target.innerHTML);
			handler(value);
		}
	},
	handle_explain_click : function(explain_info) {
		this.setState({'explain_info' : explain_info});
	},
	hide_explain : function(input_element) {
		this.setState({'explain_info' : {} });
	},

	max_income_explain : 'Согласно <a target="blank" href="http://egov.kz/wps/portal/!ut/p/b0/04_Sj9CPykssy0xPLMnMz0vMAfIjc7PyChKtUvKTS3NT80r0w_Wj9KNgPM8U_UhvAwsDELC0jAdJ5STmpZcmpqfqRxaV6hfk5lqUOyoqAgAmbcPa/#z4414">закону "О налогах и других обязательных платежах в бюджет (Налоговый кодекс)" от 09.12.2008, статья 429, пункт 3</a> и <a target="blank" href="https://egov.kz/wps/portal/!ut/p/b0/04_Sj9CPykssy0xPLMnMz0vMAfIjc7PyChKtUvKTS3NT80r0w_Wj9KNgPM8U_cgoQ1MDEDAxMgNJ5STmpZcmpqfqRxaV6hfk5lqUOyoqAgBJEGSq#z11">закону "О республиканском бюджете на 2016-2018 годы", статья 11 пункт 1</a> предельный доход за весь год не должен превышать 300 кратный размер минимальной заработной платы на 2016 год. Если вы рассчитываете стоимость патента не на весь год (12 месяцев) мы предполагаем, что ваш доход одинаков каждый месяц.',

	min_income_explain : 'Закон <a target="blank" href="http://egov.kz/wps/portal/!ut/p/b0/04_Sj9CPykssy0xPLMnMz0vMAfIjc7PyChKtUvKTS3NT80r0w_Wj9KNgPM8U_UhvAwsDELC0jAdJ5STmpZcmpqfqRxaV6hfk5lqUOyoqAgAmbcPa/"> "О налогах и других обязательных платежах в бюджет (Налоговый кодекс)" от 09.12.2008</a> не устанавливает минимальный размер дохода при применении специального налогового режима на основе патента. Если ваш фактический доход будет меньше, чем заявленный в то согласно <a target="blank" href="http://egov.kz/wps/portal/!ut/p/b0/04_Sj9CPykssy0xPLMnMz0vMAfIjc7PyChKtUvKTS3NT80r0w_Wj9KNgPM8U_UhvAwsDELC0jAdJ5STmpZcmpqfqRxaV6hfk5lqUOyoqAgAmbcPa/#z4448">статье 432, пункту 3</a> вы вправе представить расчет в виде дополнительной налоговой отчетности на сумму уменьшения стоимости патента. Но так как стоимость патента оплачивается перед началом его действия, а так же, потому что согласно <a target="blank" href="http://egov.kz/wps/portal/!ut/p/b0/04_Sj9CPykssy0xPLMnMz0vMAfIjc7PyChKtUvKTS3NT80r0w_Wj9KNgPM8U_UhvAwsDELC0jAdJ5STmpZcmpqfqRxaV6hfk5lqUOyoqAgAmbcPa/#4439">статье 432, пункту 1</a>, в стоимость патента включаются сумма социальных отчислений, которая согласно закону <a target="blank" href="http://egov.kz/wps/portal/!ut/p/b0/04_Sj9CPykssy0xPLMnMz0vMAfIjc7PyChKtUvKTS3NT80r0w_Wj9KNgPM8U_cgoA2MDIDAxMI0HSeUk5qWXJqan6kcWleoX5OZalDsqKgIAr22gxA!!/#z16">"Об обязательном социальном страховании" от 24.04.2003 статье 14, пункту 2</a> не может быть меньше, чем 5 процентов от минимальной заработной платы, устанавливаемой законом <a target="blank" href="https://egov.kz/wps/portal/!ut/p/b0/04_Sj9CPykssy0xPLMnMz0vMAfIjc7PyChKtUvKTS3NT80r0w_Wj9KNgPM8U_cgoQ1MDEDAxMgNJ5STmpZcmpqfqRxaV6hfk5lqUOyoqAgBJEGSq#z11">"О республиканском бюджете на 2016-2018 годы" статья 11 пункт 1</a>, мы ограничиваем минимальный размер дохода размером минимальной заработной платы.',

	income_taxed_explain : 'Согласно закону <a target="blank" href="http://egov.kz/wps/portal/!ut/p/b0/04_Sj9CPykssy0xPLMnMz0vMAfIjc7PyChKtUvKTS3NT80r0w_Wj9KNgPM8U_cgoQ2MDEDA0MAVJ5STmpZcmpqfqRxaV6hfk5lqUOyoqAgDuJERZ/#z135">"О пенсионном обеспечении в Республике Казахстан" от 20.06.2013 статья 25, пункт 3</a> размер обязательный пенсионных отчислений не может быть меньше чем 10 процентов от минимального размера заработной платы устанавливаемой законом <a target="blank" href="https://egov.kz/wps/portal/!ut/p/b0/04_Sj9CPykssy0xPLMnMz0vMAfIjc7PyChKtUvKTS3NT80r0w_Wj9KNgPM8U_cgoQ1MDEDAxMgNJ5STmpZcmpqfqRxaV6hfk5lqUOyoqAgBJEGSq#z11">"О республиканском бюджете на 2016-2018 годы" статья 11 пункт 1</a>. Поэтому мы ограничиваем размер заявленного дохода для исчисления обязательных пенсионных отчислений размером минимальной заработной платы.',

	min_mandatory_pc_explain : 'Согласно закону <a target="blank" href="http://egov.kz/wps/portal/!ut/p/b0/04_Sj9CPykssy0xPLMnMz0vMAfIjc7PyChKtUvKTS3NT80r0w_Wj9KNgPM8U_cgoQ2MDEDA0MAVJ5STmpZcmpqfqRxaV6hfk5lqUOyoqAgDuJERZ/#z135">"О пенсионном обеспечении в Республике Казахстан" от 20.06.2013 статья 25, пункт 3</a> размер обязательный пенсионных отчислений равен 10 процентов от заявляемого дохода, но не менее 10 процентов от минимального размера заработной платы устанавливаемой законом <a target="blank" href="https://egov.kz/wps/portal/!ut/p/b0/04_Sj9CPykssy0xPLMnMz0vMAfIjc7PyChKtUvKTS3NT80r0w_Wj9KNgPM8U_cgoQ1MDEDAxMgNJ5STmpZcmpqfqRxaV6hfk5lqUOyoqAgBJEGSq#z11">"О республиканском бюджете на 2016-2018 годы" статья 11, пункт 1</a>.',

	max_mandatory_pc_explain : 'Согласно закону <a target="blank" href="http://egov.kz/wps/portal/!ut/p/b0/04_Sj9CPykssy0xPLMnMz0vMAfIjc7PyChKtUvKTS3NT80r0w_Wj9KNgPM8U_cgoQ2MDEDA0MAVJ5STmpZcmpqfqRxaV6hfk5lqUOyoqAgDuJERZ/#z135">"О пенсионном обеспечении в Республике Казахстан" от 20.06.2013 статья 25, пункт 3</a> размер обязательный пенсионных отчислений не может быть выше 10 процентов от семидесятипятикратного минимального размера заработной платы устанавливаемой законом <a target="blank" href="https://egov.kz/wps/portal/!ut/p/b0/04_Sj9CPykssy0xPLMnMz0vMAfIjc7PyChKtUvKTS3NT80r0w_Wj9KNgPM8U_cgoQ1MDEDAxMgNJ5STmpZcmpqfqRxaV6hfk5lqUOyoqAgBJEGSq#z11">"О республиканском бюджете на 2016-2018 годы" статья 11, пункт 1</a>.',

	pensioner_explain : 'Согласно закону "О пенсионном обеспечении в Республике Казахстан" от 20.06.2013 лица достигшие возраста указанного в <a target="blank" href="http://egov.kz/wps/portal/!ut/p/b0/04_Sj9CPykssy0xPLMnMz0vMAfIjc7PyChKtUvKTS3NT80r0w_Wj9KNgPM8U_cgoQ2MDEDA0MAVJ5STmpZcmpqfqRxaV6hfk5lqUOyoqAgDuJERZ/#z69">11 статье</a> являются пенсионнерами.<br/>Пенсионеры не являются лицами подлежащими обязательному социальному страхованию согласно закону "Об обязательном социальном страховании" <a target="blank" href="http://egov.kz/wps/portal/!ut/p/b0/04_Sj9CPykssy0xPLMnMz0vMAfIjc7PyChKtUvKTS3NT80r0w_Wj9KNgPM8U_cgoA2MDIDAxMI0HSeUk5qWXJqan6kcWleoX5OZalDsqKgIAr22gxA!!/#z9">статья 8</a>.<br/>Также пенсионнеры свобождаются от уплаты обязательных пенсионных взносов согласно закону "О пенсионном обеспечении в Республике Казахстан" от 20.06.2013 <a target="blank" href="http://egov.kz/wps/portal/!ut/p/b0/04_Sj9CPykssy0xPLMnMz0vMAfIjc7PyChKtUvKTS3NT80r0w_Wj9KNgPM8U_cgoQ2MDEDA0MAVJ5STmpZcmpqfqRxaV6hfk5lqUOyoqAgDuJERZ/#z122">статья 24</a>',


	render: function() {
		var local_state = {};
		var errmsg = {};
		var parent_form  = this;
		var explain = {};
		var error_calss_str = 'errors__p';

		if (Object.keys(this.state.explain_info).length > 0){
			explain[this.state.explain_info.input_element] = this.state.explain_info;
		}

		for (var name in this.state ) {
			var local_nmb = undefined;
			if (this.state[name] === ""){
				local_nmb = NaN;
			} else {
				local_nmb = Number(this.state[name]);
			}

			local_state[name] = local_nmb;
			if (isNaN(local_nmb)) {
				errmsg[name] = [<p key={1}>Не является числом</p>];
				local_state[name] = this.state[name];
			}
		}

		if (this.state.pensioner === true) {
			local_state.mandatory_pc = 0;
			local_state.mandatory_ssc = 0;
			local_state.pensioner = true;
			local_state.income_taxed = 0;
		} else {
			local_state.pensioner = false;
		}


		if (errmsg.period === undefined) {
			if(local_state.period < 1 || local_state.period > 12) {
				errmsg['period'] = [<p>Срок действия патента не может быть меньше одного месяца или больше одного года</p>];
			}
		}

		if (errmsg.income === undefined
			&& errmsg.period === undefined) {
			var max_year_income = Math.round(max_multiple * minimal_wage);
			var max_period_income = Math.round(( max_year_income / 12 ) * local_state.period);
			var min_period_income = Math.round(minimal_wage * local_state.period);

			if (local_state.income > max_period_income ) {
				errmsg['income'] = [<p className="{error_calss_str}" key={1}>Ваш доход за указанный период не может превышать <a className="link-hint" href="#"
					onClick = { this.handle_click_fabric(parent_form.handleIncomeChange)}>{max_period_income.toString() }</a> тенге.
					Если ваш доход превышает эту сумму, вы не в праве применять специальный налоговый режим в форме патента.
					<ExplainLink explain_html={this.max_income_explain} explain_click={ this.handle_explain_click } input_element="income" />
					</p>
				];
			}

			if (local_state.income < min_period_income ) {
				errmsg['income'] = [ <p className="{error_calss_str}" key={2}>
					Ваш доход за указанный период не может быть меньше чем минимальная заработная плата <a className="link-hint" href="#"
					onClick = {this.handle_click_fabric(parent_form.handleIncomeChange)}>{min_period_income.toString()}</a> тенге.
					<ExplainLink explain_html={this.min_income_explain} explain_click = { this.handle_explain_click } input_element = "income" />
					</p>
				];
			}
		}

		if (errmsg.income_taxed === undefined
			&& errmsg.income === undefined
			&& errmsg.period === undefined
			&& local_state.pensioner === false) {


			var min_income_taxed = Math.round(local_state.period * minimal_wage );
			if (local_state.income_taxed < min_income_taxed || local_state.income_taxed > local_state.income) {
				errmsg['income_taxed'] = [
					<p className="{error_calss_str}" key={1}>Заявленный доход для исчисления обязательных пенсионных отчислений за указанный период не может быть меньше чем <a className="link-hint" href="#"
					onClick = { this.handle_click_fabric(parent_form.handleIncomeTaxedChange) }>{min_income_taxed.toString()}</a> тенге.
					<ExplainLink explain_html={this.income_taxed_explain} explain_click = { this.handle_explain_click } input_element = "income_taxed" /> И не может превышать сумму заявленного дохода <a className="link-hint" href="#"
					onClick = { this.handle_click_fabric(parent_form.handleIncomeTaxedChange) }>{ local_state.income.toString() }</a> тенге.
					</p>
				];
			}
		}

		if (errmsg.mandatory_pc === undefined
			&& errmsg.income_taxed === undefined
			&& errmsg.income === undefined
			&& errmsg.period === undefined ) {

			var min_income_taxed = Math.round(local_state.period * minimal_wage );
			if (local_state.pensioner === false) {

				var min_mandatory_pc = Math.round(local_state.income_taxed  * 0.1);
				var max_mandatory_pc = Math.round(min_income_taxed * 75);


				if (local_state.mandatory_pc < min_mandatory_pc || local_state.mandatory_pc > min_mandatory_pc) {
					errmsg['mandatory_pc'] = [
						<p className="{error_calss_str}" key={1}>Обязательные пенсионные очисления за указаный период не могут быть меньше или превышать сумму в <a className="link-hint" href="#"
						onClick = { this.handle_click_fabric(parent_form.handleMandatoryPCChange) }>{ min_mandatory_pc.toString() }</a> тенге.
						<ExplainLink explain_html={this.min_mandatory_pc_explain} explain_click = { this.handle_explain_click } input_element = "mandatory_pc" />
						</p>
					]
				} else if (local_state.mandatory_pc < min_mandatory_pc && local_state.mandatory_pc > max_mandatory_pc) {
					errmsg['mandatory_pc'] = [
						<p className="{error_calss_str}" key={2}>Обязательные пенсионные очисления за указаный период не могут превышать <a className="link-hint" href="#"
						onClick = { this.handle_click_fabric(parent_form.handleMandatoryPCChange) }>{ max_mandatory_pc.toString() }</a> тенге.
						<ExplainLink explain_html={this.max_mandatory_pc_explain} explain_click = { this.handle_explain_click } input_element = "mandatory_pc" />
						</p>
					]
				}
			}

		}

		local_state['patent_cost'] = 'Ошибка'
		local_state['personal_income_tax'] = 'Ошибка'
		local_state['social_tax'] = 'Ошибка'

		if (local_state.pensioner === false || local_state.pensioner === undefined) {
			local_state['mandatory_ssc'] = 'Ошибка'
		}

		if (errmsg.mandatory_pc === undefined
			&& errmsg.income_taxed === undefined
			&& errmsg.income === undefined
			&& errmsg.period === undefined ) {

			local_state.patent_cost = Math.round(local_state.income * 0.02);
			local_state.personal_income_tax = Math.round(local_state.patent_cost * 0.5);
			var temp_social_tax = Math.round(local_state.patent_cost * 0.5);
			if (local_state.pensioner === false || local_state.pensioner === undefined){
				local_state.mandatory_ssc = Math.round(local_state.income_taxed * 0.05);
			}
			local_state.social_tax = Math.round(temp_social_tax - local_state.mandatory_ssc);

			if (local_state.social_tax < 0 ) {
				local_state.social_tax = 0;
			}

		}

		return	(
			<div>
			<form>
				<Pensioner
					pensioner_change = {this.handlePensionerChange}
					pensioner={local_state.pensioner}
					errors = {errmsg.pensioner}
					handle_explain_click = {this.handle_explain_click}
					hide_explain = {this.hide_explain}
					pensioner_explain = {this.pensioner_explain}
					explain = {explain.pensioner}/>
				<Period period_change = {this.handlePeriodChange} period={local_state.period} errors = {errmsg.period} />
				<IncomeInput
					income_change={this.handleIncomeChange}
					income = {this.state.income}
					errors = {errmsg.income}
					explain = {explain.income}
					hide_explain = { this.hide_explain } />
				<PatentCosts patent_cost={local_state.patent_cost}/>
				<PersonalIncomeTax amount={local_state.personal_income_tax}/>
				<SocialTax amount={local_state.social_tax} />
				<MandatorySSC amount={local_state.mandatory_ssc} />
				<IncomeTaxed
					income_taxed_change = {this.handleIncomeTaxedChange}
					amount={local_state.income_taxed}
					errors = {errmsg.income_taxed}
					explain = {explain.income_taxed}
					readOnly = {local_state.pensioner}
					hide_explain = { this.hide_explain } />
				<MandatoryPC
					mandatory_pc_change = {this.handleMandatoryPCChange}
					amount={local_state.mandatory_pc}
					errors = {errmsg.mandatory_pc}
					explain = {explain.mandatory_pc}
					readOnly = {local_state.pensioner}
					hide_explain = { this.hide_explain } />

			</form>
			</div>
		);
	}
})

var _patent_form = ReactDOM.render(
	<PatentForm />,
	document.getElementsByClassName('main__form')[0]
);

var body = document.getElementsByTagName('body')[0];

body.addEventListener('click', function(event) {
	if (event.target.classList.contains('link-hint')){
		event.preventDefault();
		_patent_form.hide_explain();
	}
});

}());
