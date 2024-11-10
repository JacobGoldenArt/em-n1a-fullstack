<div class="app-settings-panel">
	<form action="">
		<div class="form-group">
			<label for="model">Model</label>
			<div class="select-wrapper">
				<select id="model" name="model">
					<option disabled selected>OpenAI</option>
				<option value="gpt-4o">GPT-4o</option>
				<option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
				<option disabled>Anthropic</option>
				<option value="claude-3-opus-20240229">Claude 3.5</option>
					<option value="claude-3-sonnet-20240229">Claude 3.0</option>
				</select>
			</div>
			<label for="temperature">Temperature</label>
			<input type="range" id="temperature" name="temperature" min="0" max="1" step="0.1" value="0.1" />
			<button type="submit">Update Settings</button>
				</div>
	</form>
</div>


<style>
.app-settings-panel {
	width: 300px;
	height: 100vh;
	padding: 20px;
}

</style>
